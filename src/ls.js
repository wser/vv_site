import { sankeydata } from "./constants";

/* local storage */
const lsObj = getLSItem("w_nf") || {};
const lsTheme = lsObj.themeIs || "";
const lsId = lsObj.startingId || 1;
const lsData = lsObj.dataIs || {};

const namesArr = [{ id: '', name: '' }]; // all ID names in db

// get all people in db that are not connected
export const getUnlinkedPeopleData = () => {
  // array of found names in parent/children relation
  /* prettier-ignore */
  let namesFound = [...new Set(sankeydata.nodes.map((item) => item.name))]; // return only the distinct / unique nodes

  //let sortedN = namesFound.sort((a, b) => a.id - b.id); // sorted by number
  /* prettier-ignore */
  sankeydata.unlinked = namesArr.filter((e) => !namesFound.find((a) => e.id === a.id)).slice(1); // remove first item

  // console.log(missing);
};

export function setLSItem(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

function getLSItem(key) {
  const item = localStorage.getItem(key);
  return JSON.parse(item);
}

export {
    lsObj,
    lsTheme,
    lsId,
    lsData,
    namesArr
}