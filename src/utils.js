import { path, zoom } from 'd3'
import { $, $$d3, svg } from './constants'

export const c = (e) => console.log(e);
export const ct = (e) => console.table(e);

export function sankeyLinkPathCenter(link) {
  /**
   * This function is a drop in replacement for d3.sankeyLinkHorizontal().
   * Except any accessors/options.
   */
  // Start and end of the link
  let sx = link.source.x1 + 4;
  let tx = link.target.x0;

  // where e.g. sy is the centerlink on the source side
  let sy = link.source.y0 + (link.source.y1 - link.source.y0) / 2; // source vertical center of node
  let ty = link.target.y0 + (link.target.y1 - link.target.y0) / 2; // target vertical center of node

  // Center (x) of the link
  let cx = sx + (tx - sx) * 0.5;

  // Define path
  let pathD = path();
  pathD.moveTo(sx, sy);
  pathD.bezierCurveTo(cx, sy, cx, ty, tx, ty);
  pathD.lineTo(tx, ty);

  return pathD.toString();
}

export function zoomIt() {
  const n = $$d3('.node'); // select all nodes
  const l = $$d3('.link'); // select all paths
  const p = $$d3('#totalPeoplePerLayer');

  const handleZoom = (e) => {
    n.attr('transform', e.transform);
    l.attr('transform', e.transform);
    p.attr('transform', e.transform);
    //centerNode(e.transform);
  };
  /* prettier-ignore */
  const zoomD = zoom()
    .scaleExtent([0.4, 1.5]) // set zoom boundaries
    .on('zoom', handleZoom); // call function on zoom

  svg.call(zoomD); // add zoom to svg graph
}

export function eventFire(el, etype) {// simulate user interaction
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

export function isEmpty(value) { // check if value is empty
  return value == null || value.length === 0;
}

export function setVisible(elementOrSelector, visible) { // set element visibility
  return ((typeof elementOrSelector === 'string'
    ? $(elementOrSelector)
    : elementOrSelector
  ).style.display = visible ? 'block' : 'none');
}

export function convertToCsv(arr) {
  const keys = Object.keys(arr[0]);
  const replacer = (_key, value) => (value === null ? '' : value);
  const processRow = (row) =>
    keys.map((key) => JSON.stringify(row[key], replacer)).join(',');
  return [keys.join(','), ...arr.map(processRow)].join('\r\n');
}

export function generateNodeName(nodes) {
  return `Node${nodes.length + 1}`;
}
