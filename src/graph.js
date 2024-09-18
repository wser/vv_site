import { rgb, drag, select } from 'd3'
import sankey from './sankey'
import { color, svg, sankeydata } from './constants'
import { tooltipData } from './data'
import { sankeyLinkPathCenter } from './utils'
import { xsFont, lineColors, showAll } from './decoration'
import { highlight_node_links } from './interaction'

const ttl = 100 //sankeydata.nodes.length; // total number of nodes on graph as base to svg height
    
// set the dimensions and margins of the graph
const margin = { top: 12, right: 10, bottom: 10, left: 8 },
  width = 1000,
  height = 500 + Math.ceil(ttl) * 3.5; // calculation based on number of nodes

/* prettier-ignore */
let translate = () => 'translate(' + margin.left + ',' + (margin.top - 6) + ')'; // move graph elements
//let translate2 = (event, d) => `translate(${d.x0 = Math.max(0, Math.min(width - d.x1 + d.x0, event.x))},${d.y0 = Math.max(0, Math.min(height - d.y1 + d.y0, event.y))})`; // move graph elements
let calcRadius = (d) => { let a = (d.y1 - d.y0) * 0.45; if (a < 5) return 5; if (a > 10) return 10; return a; };
let nodeColor = (d) => (d.color = color(d.name.replace(/ .*/, '')));

// Set the sankey diagram properties
let sankeyGenerator = sankey()
  .nodeWidth(17)
  .nodePadding(10)
  .extent([[1, 1], [width - 1, height - 1]]);
//.size([width - margin.right, height - margin.bottom * 3]);

//change color of interacted node element
const ineractiveColors = () => svg.on('click', (e) => {
  const fillColor = `rgb(${[1, 2, 3].map((x) => (Math.random() * 256) | 0)})`; // pick a random color
  if (!e.target.id) showAll(); // if clicked outside of element, show all elements; click elswhere
  else if (e.target.id.includes('link')) return; // if link is clicked return
  else e.target.style.fill = fillColor; // apply color in the element we actually clicked on
})

/* prettier-ignore */
svg
  .attr('width', width + margin.left)
  .attr('height', height + margin.top)

// get count of people per fixedlayer
const totalPeoplePerLayer = (t) => {
  let numOfPeople = Object.defineProperty(sankeydata, 'numOfPeoplePerLayer', {
    get() {
      let element = [];
      let mmax = Math.max(...this.nodes.map((a) => a.fixedlayer)); // largest number in fixed layer datacolumn
      for (let i = 0; i <= mmax; i++)
        element.push(this.nodes.filter((o) => o.fixedlayer == i).length);
      return element;
    },
  });

  let cols_x = sankeydata.nodes
    .map((d) => d.x0)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => a - b);

  cols_x.forEach((d, i) => {
    svg
      .append('text')
      .attr('id', 'totalPeoplePerLayer')
      .style('font-size', xsFont)
      .attr('x', d - 8)
      .attr('y', -10)
      .attr('text-anchor', 'start')
      .text(`${i} #:` + numOfPeople.numOfPeoplePerLayer[i])
      .attr('transform', t);
  });
  
}

const drawUnlinkedPeople = () => {
  const unlinked = svg
    .append('g')
    .selectAll('.unlinked')
    .data(sankeydata.unlinked)
    .enter()
    .append('g')
    .attr('class', 'unlinked');

  unlinked
    .append('text')
    .text((d) => d.id)
    .attr('dx', (d) => (d.id > 100 ? 10 : 13)) // if unlinked id is larger, move to the right
    .attr('dy', (d, i) => 58 + i * 33);

  unlinked
    .append('circle')
    .attr('id', (d) => d.id)

    .style('stroke', 'gray')
    .style('fill', 'transparent')
    .attr('r', 15)
    .attr('cx', 20)
    .attr('cy', (d, i) => 53 + i * 33);

  unlinked.on('click', highlight_node_links);
};

const drawLinks = (g, t) => {
  const link = svg // add in the links
    .append('g')
    .selectAll('.link')
    .data(g.links);

  // prettier-ignore
  link
    .enter()
    .append('path')
      .attr('class', 'link')  // DOM attribute
      
      // .attr('d', d3.sankeyLinkHorizontal())  // type of link
      .attr('d', (d) => sankeyLinkPathCenter(d))  // type of link

      .attr('id', (d, i) => {d.id = i; return 'link-' + i;}) // set id for every link
      .attr('stroke-width', d => d.value * 1.6)  // width of link line
      .style('stroke', (d) => lineColors(d.target.id))  // color links with different color from function
      .attr('transform', t)

  // .append('title') // add the link titles
  // .text((d) => d.source.name + ' → ' + d.target.name); //+ '\n' + format(d.value));
}

// const dragmove = (event, d) => {
//   select(this)
//       .attr('transform', translate2(event, d));
//       sankeyGenerator.update(sankeydata.nodes );
//       drawNodes();
// };


const drawNodes = (g, t) => {
  // add in the nodes
  const node = svg
    .append('g')
    .selectAll('.node')
    .data(g.nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', t);

  node.on('click', highlight_node_links);

  // node.call(
  //   drag()
  //     .subject((d) => d)
  //     .on('start', function () { this.parentNode.appendChild(this);})
  //     .on('drag', dragmove)
  //     // .on('end', dragEnd)
  // );

  // // prettier-ignore
  // node // RECT
  //   .append('rect')
  //   .attr('x', (d) => d.x0)
  //   .attr('y', (d) => d.y0)
  //   //.attr('height', (d) => d.y1 - d.y0)
  //   .attr('height', 5)
  //   .attr('width', sankey.nodeWidth())
  //   .style('fill', nodeColor)
  //   .attr('id', (d) => 'rect-' + d.id)
  // //  .style("stroke", "url(#svgGradient)")
  // .style('stroke', (d) => d3.rgb(d.color).darker(2));

  // add the circles for the nodes
  // prettier-ignore
  node // CIRCLE
    .append('circle')
    .attr('cx', (d) => d.x0 +1)
    .attr('cy', (d) => (d.y1 + d.y0) / 2 - 6) // center circle verticaly to rect
    .attr('r', (d) => calcRadius(d)) //calculate circle radius if it's too small/big
    .attr('transform', t)
    .style('fill', nodeColor)
    .attr('id', (d, i) => 'rect-' + d.id)
    .style('stroke', (d) => rgb(d.color).darker(2));

  node // TITLE on hover
    .append('title') // add hover text (title html element)
    .text((d) => tooltipData(d)); // tooltip;

  node // TEXT
    .append('text')
    .attr('x', (d) => (d.sourceLinks.length > 6 ? d.x0 - 14 : d.x0 - 4))
    .attr('y', (d) => (d.y1 + d.y0) / 2 - 2) // center text verticaly to rect/circle
    .attr('dy', '0.45em')
    .attr('text-anchor', 'end')
    .text((d) => d.name)
    .attr('id', (d) => 'text-' + d.id)
    .filter((d) => d.x0 < width / 2) // change text position inwards on right side of window
    .attr('x', (d) => (d.sourceLinks.length >= 6 ? d.x1 + 14 : d.x1 + 4))
    .attr('text-anchor', 'start');

  // node.on('dblclick', (d) => alert(tooltipData(d))); // tooltip;
}


export function drawGraph(){
  

  const graph = sankeyGenerator(sankeydata); //create graph elements

  totalPeoplePerLayer(translate) //calculate total number of people in one layer

  // drawUnlinkedPeople() // show if there are unlinked people in db
  
  drawLinks(graph, translate) // first display links
  
  drawNodes(graph, translate) // then display nodes - due to visual overlapping
    
  ineractiveColors() // change initial color on element interaction
};



