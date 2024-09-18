import { sankeydata } from "./constants";
import { lsContainer } from './buttons';
import { convertToCsv, c } from "./utils";
import { lsObj, setLSItem, namesArr, getUnlinkedPeopleData } from "./ls";

export const dataSource = "demo_data_plus.csv";
// "family_data.csv";
// 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ18mqosmY30kSEbtqnC86t-fzcCIKte2Z3TXB_eEZAgwCq2zGYULsnXI7hcXGtF0ZRHCINB-rI_3s7/pub?gid=1740140475&single=true&output=csv';



export function handleSelectedId(id) {
    let el = lsContainer.classList.contains('selectedPersist');

    if (el) lsObj.startingId = id; // if element is selected update ID
    else lsObj.startingId = ''; // if not selected, remove ID

    setLSItem('w_nf', lsObj); // update object value in local storage
}

export function tooltipData(d) {
  c(d)
  const mln = d.maritallastname
    ? d.maritallastname + " (" + d.birthlastname + ")"
    : d.birthlastname; // create marital/birth last name
  const numOfKids = d.kids || d.sourceLinks.length; // check if number of kids exist or return links count
  const kids = numOfKids || 0; // return first result or zero

  const bd = d.birthday ? d.birthday : "?";
  const by = bd ? parseInt(bd.slice(-4)) : "";
  const bp = d.birthplace ? d.birthplace : "?";
  const dd = d.deathday ? d.deathday : "";
  const dy = dd ? parseInt(dd.slice(-4)) : "";
  const dp = d.deathplace ? d.deathplace : "";
  const age = dy
    ? dy - by // if death year, calculate
    : by
    ? new Date().getFullYear() - by + " years" // if birth year, calculate
    : "n/a";
  const lastcell =
    dd || dd
      ? `✝️: ${dy} - ${dp} - ${dd}
      age: ${age}`
      : `age: ${age}`;

  return `id: ${d.id}
      name: ${d.name} ${mln} 
      kids: ${kids}
      🧬: ${by} - ${bp} - ${bd}
      ${lastcell}
      note: ${d.note || ""}
    `;
}

export function returnFatherId(d) {
    let id0 = d?.targetLinks[0]?.source.id;
    let id1 = d?.targetLinks[1]?.source.id;
  
    if (d.targetLinks[0].source.birthlastname == d.birthlastname) {
      //tata
      idM.value = isEmpty(d.targetLinks[0]) ? '' : id0;
      idF.value = isEmpty(d.targetLinks[1]) ? '' : id1;
    }
    if (d.targetLinks[1].source.birthlastname == d.birthlastname) {
      //mama
      idM.value = isEmpty(d.targetLinks[1]) ? '' : id1;
      idF.value = isEmpty(d.targetLinks[0]) ? '' : id0;
    }
}

function extractColumns(csvData, columnIndices){
  const lines = csvData.split('\n');
  //const headerRow = lines[0].split(',');
  const dataRows = lines.slice(1);
  const extractedData = [];

  for (const row of dataRows){
    const rowData = row.split(",");
    const extractedRow = [];
    for (const columnIndex of columnIndices){
      let v = parseInt(rowData[columnIndex].replace('"','').trim())
      if (!Number.isNaN(v)) extractedRow.push(v);
    }
    extractedData.push(extractedRow);
  }
  return extractedData;
}

const makeArrOfIDsAndNames = (d) => {
  d.pID //only if id exists
    ? namesArr.push({
        fatherId: parseInt(d.pF),
        motherId: parseInt(d.pM),
        id: parseInt(d.pID),
        name: d.pName,
        birthlastname: d.pBirthLastName,
        maritallastname: d.pMaritalLastName,
        fixedlayer: parseInt(d.pFixLayer),
        birthday: d.pBDay,
        birthplace: d.pBirthPlace,
        deathday: d.pDDay,
        deathplace: d.pDeathPlace,
        note: d.pNote,
        kids: d.kids
      })
    : '' 
}

const goThroughRowsOfData = (d) => {
  // loop only if values in column pF
  if (d.pF) {
    // find names for ids
    let nameP, nameC;
    let partners = `${d.pF},${d.pM}`
    let children = `${d.pID}`

    let pr = partners.split(',');
    let ch = children.split(',');
    let kids = parseInt(d.kids);

    pr.forEach((n) => {
      nameP = namesArr.find((i, value) => parseInt(value) === parseInt(n)); // match id with parent name
      sankeydata.nodes.push({ name: nameP, });

      ch.forEach((n, i) => {
        nameC = namesArr.find((i, value) => parseInt(value) === parseInt(n));
        sankeydata.nodes.push({ name: nameC });
        sankeydata.links.push({
          source: nameP,
          target: nameC,
          value: 1,
          kids: kids,
        });
      });
    });
  }
}

export function prepareData(data) {
  //console.log(data);
  lsObj.dataIs = convertToCsv(data); // convert parsed JSON data to CSV
  setLSItem('w_nf', lsObj); // add data to local storage in CSV format
  
  // first - go through data to make array of IDS and Names  
  data.forEach((d) => makeArrOfIDsAndNames(d));

  // second - go through rows of data - two partners, multiple children
  data.forEach((d) => goThroughRowsOfData(d));

  // get all people in db that are not connected
  // getUnlinkedPeopleData()

  let arrx = extractColumns(lsObj.dataIs, [0,1])
  const newArrx = arrx.filter(arr => arr.length); 
  c(newArrx)


  ////////////////////////////////////////
  ////////////////////////////////////////

  // make array of children and remove empty strings from array
  // let childrenArr = Array.from(data, (d) => d.children).filter((n) => n);
  // let arrx = arri;
  // arrx = Array.from(childrenArr, (d) => JSON.parse('[' + d + ']')); // make array of arrays of values from strings

  sankeydata.nodes = [...new Set(sankeydata.nodes.map((d) => d.name))]; // return only the distinct / unique nodes,

  // loop through each link replacing the text with its index from node
  sankeydata.links.forEach((d, i) => {
    d.source = sankeydata.nodes.indexOf(sankeydata.links[i].source);
    d.target = sankeydata.nodes.indexOf(sankeydata.links[i].target);
  });

  // now loop through each nodes to make nodes an array of objects
  sankeydata.nodes.forEach(
    (d, i) =>
      (sankeydata.nodes[i] = {
        name: d.name,
        id: d.id,
        fixedlayer: d.fixedlayer,
        maritallastname: d.maritallastname,
        birthlastname: d.birthlastname,
        birthday: d.birthday,
        birthplace: d.birthplace,
        deathday: d.deathday,
        deathplace: d.deathplace,
        note: d.note,
        kids: d.kids
      })
  );
};
