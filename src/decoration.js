import {
  $, $d3, $$d3,
  rez, shareIcon,
  sankeydata,
} from "./constants";

import { lsObj, setLSItem } from "./ls";

import { inputBox, emptyInputBoxes, fillInputBoxes } from "./input_boxes";

import { qr, searchIcon, selectedID, lsContainer } from './buttons'

const xsFont = 8;
const smFont = 13;
const lgFont = 16;

let isDark = false;

let arri = []; // childrens array of arrays for colorizing links

// prettier-ignore
function lineColors(data){
    // prettier-ignore
    const colrs = [
    "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#07d7f6", "#648177", "#0d5ac1",
    "#f205e6", "#1c0365", "#14a9ad", "#4ca2f9", "#a4e43f", "#d298e2", "#6119d0",
    "#d2737d", "#c0a43c", "#f2510e", "#20f6ba", "#61da5e", "#cd2f00", "#77ecca",
    "#9348af", "#01ac53", "#c5a4fb", "#996635", "#b11573", "#4bb473", "#75d89e",
    "#2f3f94", "#2f7b99", "#da967d", "#34891f", "#b0d87b", "#ca4751", "#7e50a8",
    "#c4d647", "#e0eeb8", "#11dec1", "#289812", "#566ca0", "#ffdbe1", "#2f1179",
    "#935b6d", "#916988", "#513d98", "#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
    "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
    "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
    "#5be4f0", "#57c4d8", "#a4d17a", "#be608b", "#96b00c", "#088baf", "#f158bf",
    "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234", "#6749e8",
    "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158", "#fb21a3",
    "#51aed9", "#5bb32d", "#21538e", "#89d534", "#d36647", "#7fb411", "#0023b8",
    "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3", "#79352c", "#521250",
    "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec", "#1bb699", "#6b2e5f",
    "#64820f", "#21538e", "#89d534", "#d36647", "#7fb411", "#0023b8", "#3b8c2a",
    "#986b53", "#f50422", "#983f7a", "#ea24a3", "#79352c", "#521250", "#c79ed2",
    "#d6dd92", "#e33e52", "#b2be57", "#fa06ec", "#1bb699", "#6b2e5f", "#64820f",
    "#9cb64a", "#996c48", "#9ab9b7", "#06e052", "#e3a481", "#0eb621", "#fc458e",
    "#b2db15", "#aa226d", "#792ed8", "#73872a", "#520d3a", "#cefcb8", "#a5b3d9",
    "#7d1d85", "#c4fd57", "#f1ae16", "#8fe22a", "#ef6e3c", "#243eeb", "#dd93fd",
    "#3f8473", "#e7dbce", "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a",
    "#15b9ee", "#0f5997", "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7",
    "#cb2582", "#ce00be", "#32d5d6", "#608572", "#c79bc2", "#00f87c", "#77772a",
    "#6995ba", "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e",
    "#d00043", "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052",
    "#e08c56", "#28fcfd", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
    "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
    "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
    "#615af0", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4", "#7ad236",
    "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06", "#f53b2a",
    "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a", "#4cf09d",
    "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#71b1f4", "#a2f8a5",
    "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35", "#1c65cb", "#5d1d0c",
    "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44", "#1bede6", "#8798a4",
    "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#88e9b8", "#c2b0e2", "#86e98f",
    "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff", "#f812b3", "#b17fc9", "#8d6c2f",
    "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6", "#dba2e6", "#76fc1b", "#608fa4"
]
    const obj = {}; // make object of values from childrens array
    arri.forEach((arr, i) => {  // loop through all elements of children array of arrays
      let a = [...arr]; // spread array elements
      for (const key of a) obj[key] = colrs[i]; //assign color to number id for each children element
    });
    // add different color to each children-parent relation link
    return obj[parseInt(data)] ?? 'gray'; // return color or default to gray
}

function hideElse(node) {
  $$d3("path").style("opacity", 0);
  $$d3("circle").style("opacity", 0);

  hideText();
  emptyInputBoxes();
  fillInputBoxes(node);
}

function hideText() {
  $$d3("text").style("opacity", 0);
}

function showAll() {
  // if (switchEl.checked) return;
  $$d3("path").style("opacity", 1);
  //$$d3('rect').style('opacity', 1);
  $$d3("circle").style("opacity", 1);
  selectedID.innerHTML = ""; // hide id if everything is shown
  lsContainer.style.backgroundColor=""; // remove color from ls button
  lsContainer.style.display="none"; // remove element from graph
  //setVisible(selectedID, false); // hide id if everything is shown
  rez.text("Total: " + sankeydata.nodes.length); // total number of displayed people
  lsContainer.classList.remove("selectedPersist"); // remove selected border
  showText();
  emptyInputBoxes();
  qr.style.transform = "scale(1) translate(0, 0)";
}

function showText() {
  $$d3("text").style("opacity", 1).style("font-size", smFont);
  //.style('fill', 'black');
  $$d3("#totalPeoplePerLayer").style("font-size", xsFont);
}

function dark() {
  let fontColor = "#ddd";
  let darkColor = "#303030";
  // surroundings
  $("#mode_icon").setAttribute("href", "../my-feather-sprite.svg#sun"); // svg icon
  $("#mode_icon").style.color = fontColor;
  $d3("body").style("background", darkColor);
  $("#page_title").style.color = fontColor;
  inputBox.style.backgroundColor = darkColor; // search field background
  inputBox.style.color = fontColor; // search field font color
  searchIcon.style.color = fontColor; // search svg icon
  info.style.color = fontColor; // info icon
  exitz.style.color = fontColor; // x icon
  pencil.style.color = fontColor; // pencil icon
  sendz.style.color = fontColor; // send to db icon
  shareIcon.style.color = fontColor; // share icon
  $("#cred").style.color = fontColor; // created at text
  $$d3(".input").style("color", fontColor); // data input fields font color
  $$d3(".input-group .placeholder").style("color", fontColor); // data input fields placeholder color
  // graph area
  $$d3(".unlinked text").style("fill", fontColor);
  $$d3(".node text").style("fill", fontColor);

  isDark = false;
  lsObj.themeIs = "dark";
  setLSItem("w_nf", lsObj);
}

function light() {
  // surroundings
  $("#mode_icon").setAttribute("href", "../my-feather-sprite.svg#moon"); // svg icon
  $("#mode_icon").style.color = "";
  $d3("body").style("background", "");
  $("#page_title").style.color = "";
  inputBox.style.backgroundColor = "";
  inputBox.style.color = "";
  searchIcon.style.color = "";
  info.style.color = "";
  exitz.style.color = "";
  pencil.style.color = "";
  sendz.style.color = "";
  shareIcon.style.color = "";
  $("#cred").style.color = "";
  $$d3(".input").style("color", "");
  $$d3(".input-group .placeholder").style("color", "");
  // graph area
  $$d3(".unlinked text").style("fill", "");
  $$d3(".node text").style("fill", "");

  isDark = true;
  lsObj.themeIs = "light";
  setLSItem("w_nf", lsObj);
}

function returnMode(mode) {
  isDark || mode === "dark" ? dark() : light();
}

export { xsFont, smFont, lgFont, 
    lineColors, hideElse, showAll, showText,
    dark, light, returnMode,
    isDark, arri
};
