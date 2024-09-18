import {$$d3, rez, sankeydata } from './constants'

import { inputBox } from './input_boxes'

import { hideElse, lgFont, showAll, smFont } from "./decoration";

export function searchAsYouType() {
	let searchValue = inputBox.value;
	let txt = searchValue.toLowerCase().trim();

	let theNode = $$d3('.node').filter((d) => {
		if (searchValue.length > 0)
			// return d.name.toLowerCase() == txt || d.birthlastname.toLowerCase() == txt; // match whole word
			return (
				d.name.toLowerCase().includes(txt) ||
				d.birthlastname.toLowerCase().includes(txt) ||
				d.maritallastname.toLowerCase().includes(txt)
			); // match every pressed char (fuzzy search)
	});

	let t = theNode._groups[0].length;

	if (t > 0) {
		hideElse();
		theNode.select('text').style('opacity', 1).style('font-size', lgFont); // increase font of all found nodes
		rez.text('Total:' + t); // display number of found people
	} else {
		rez.text('Total' + sankeydata.nodes.length); // display total number of people on graph
		$$d3('.node').select('text').style('font-size', smFont);
		showAll();
	}
}