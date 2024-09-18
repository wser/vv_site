import { editMode } from "./buttons"
import { c } from "./utils";

export function createNew(){
    if (!editMode) {c('not in edit mode'); return;}
    alert ('create new node')
}

  // selectedID.addEventListener('dblclick', (e) => {
  //   if (!editMode) {c('not in edit mode'); return;}
  //   const nodes = sankeydata.nodes
  //   const coords = pointer(e, this);
  //   const nodeName = generateNodeName(nodes);
  //   const newNode = { id: nodes.length + 1, name: nodeName };

  //   nodes.push(newNode);
  //   c(nodes)

  // });