import { $, $$, $d3, rez } from "./constants";
import { qr, lsContainer } from './buttons'
import { handleSelectedId } from "./data";
import { lsId } from "./ls";
import { hideElse, lgFont, showAll } from "./decoration";
import { setVisible, c } from "./utils";

let linkCounter = 0;
let isClicked = false;

export function highlight_node_links(ev, node) {
  // console.log(node);
  let remainingNodes = [],
    nextNodes = [];

  if ($d3(this).attr("data-clicked") == "1") {
    // back to default
    $d3(this).attr("data-clicked", "0");
    showAll();
    return;
  } else {
    // if clicked circle/rect node
    // all other nodes
    $d3(this).attr("data-clicked", "1");
    onNodeClick(node); // current node

    //$d3(this).attr('transform', 'translate( 50 , 50)');
    // node.attr('transition', 'transform 0.25s ease'); // Animation effect

    //$d3(this).select('rect').style('opacity', 1);
    $d3(this).select("circle").style("opacity", 1);
    $d3(this).select("text").style("opacity", 1).style("font-size", lgFont);
  }

  const traverse = [
    { linkType: "sourceLinks", nodeType: "target" },
    { linkType: "targetLinks", nodeType: "source" },
  ];

  linkCounter = 0;

  var BreakException = {};

  try {
    traverse.forEach((step) => {
      if (!step.nodeType) throw BreakException; // exit forEach loop
      node[step.linkType].forEach((link) => {
        remainingNodes.push(link[step.nodeType]);
        $d3("#link-" + link.id).style("opacity", 1);
      });

      while (remainingNodes.length) {
        nextNodes = [];
        remainingNodes.forEach((node, i) => {
          linkCounter++;
          node[step.linkType].forEach((link) => {
            nextNodes.push(link[step.nodeType]);
            $d3("#link-" + link.id).style("opacity", 1);
          });
          $d3("#text-" + node.id).style("opacity", 1);
          $d3("#rect-" + node.id).style("opacity", 1);
        });
        remainingNodes = nextNodes;
      }
    });
  } catch (e) {
    // if (e !== BreakException) throw e;
  }

  rez.text("Total:" + (linkCounter + 1)); // show all linked nodes
}

function onNodeClick(node) {
  hideElse(node);
  //centerNode(node);
  let el = lsContainer.classList;
  // if there is no id in local storage, remove selection border
  if (!lsId) el.remove("selectedPersist");

  lsContainer.style.display="flex"; // display id container
  lsContainer.style.backgroundColor='lightskyblue' // set its bck color

  // if there is selection border, while clicked update LS
  if (lsContainer.classList.contains("selectedPersist")) {
    handleSelectedId(`${node.id}`);
  }
}

// function centerNode(d) {
//   var x = 0,
//     y = 0,
//     centered;
//   // If the click was on the centered state or the background, re-center.
//   // Otherwise, center the clicked-on state.

//   if (d && centered === !d) {
//     centered = null;
//   } else {
//     x = width / 2 - d.x0;
//     y = height / 2 - d.y0;
//     centered = d;
//   }

//   // Transition to the new transform.
//   svg
//     .transition()
//     .duration(750)
//     .attr('transform', 'translate(' + x + ',' + y + ')');
// }

export const loadingAnimation = () => {
    /* prettier-ignore */
    const wait = (delay = 0) => new Promise((resolve) => setTimeout(resolve, delay));
  
    setVisible('.page', false);
    setVisible('#loading', true);
  
    document.addEventListener('DOMContentLoaded', () =>
      wait(1000).then(() => {
        setVisible('.page', true);
        setVisible('#loading', false);
      })
    );
}

export const enlargeQR = () => {
  // Function to increase QR image size
  isClicked = !isClicked;

  if (isClicked) {
    qr.style.transform = 'scale(15) translate(-30%, 50%)'; // Set image size to 1.5 times original
    qr.style.transition = 'transform 0.25s ease'; // Animation effect     
  } else {
    // Set image size to original
    qr.style.transform = 'scale(1) translate(0, 0)';
    qr.style.transition = 'transform 0.25s ease';
  }
}

export const toggleInputFields = () => {
  // Function to edit input fields data
  let borderBottom = (d) => d.classList.toggle('selected');
  let totalInputFields = $$('.input').length;

  //c(totalInputFields)

  for (let i = 0; i < totalInputFields; i++) {
    let item = $(`#item-${i}`);
    item.disabled = !isClicked;
    borderBottom(item);
  }

  let col = isClicked ? 'orange' : '';
  pencil.style.backgroundColor = col; //change background color of pencil
}


export {
  isClicked
}