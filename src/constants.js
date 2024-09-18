import {
    select,
    selectAll,
    scaleOrdinal,
    schemeDark2
  } from 'd3';

// constants.js
const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);
const $d3 = (e) => select(e);
const $$d3 = (e) => selectAll(e);

// format variables d3.schemeCategory10; d3.schemeAccent; d3.schemeDark2;
// d3.schemePaired; d3.schemePastel1, 2; d3.schemeSet1, 2, 3; d3.schemeTableau10
const color = scaleOrdinal(schemeDark2); // node colors
const rez = $d3('#totalLinked').text('Total:');

// const switchEl = $('#myCheckBox');

const shareButton = $('#share'); // SHARE dialog
const shareIcon = $('#share-icon'); // SHARE icon
const contact = $('#contact'); //email contact
const contacta = $('#contact-a'); //email contact a

const svg = $d3('#d3-graph').append('svg'); // append the svg object to the body of the page

const sankeydata = { // set up graph object arrays
    nodes: [],
    links: [],
    unlinked: [], // array of items that are not found in namesArr
};

export {
    $, $$, $d3, $$d3,
    color, rez,
    shareButton, shareIcon,
    contact, contacta,
    svg, sankeydata
}