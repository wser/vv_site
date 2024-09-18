import { $ } from './constants'
import { selectedID } from './buttons';
import { setVisible } from './utils';
import { returnFatherId } from './data';

const inputBox = $('#filterOn');
// input fields
const cards = $('.cards');
const ime = $('#item-0');
const prezimeR = $('#item-1');
const prezimeV = $('#item-2');
const datumR = $('#item-3');
const mjestoR = $('#item-4');
const datumS = $('#item-5');
const mjestoS = $('#item-6');
const note = $('#item-7'); // napomena
const idM = $('#item-8'); // ID mother
const idF = $('#item-9'); // ID father

export function fillInputBoxes(d) {
	try {
		// console.log(d);
		ime.value = d.name;
		prezimeR.value = d.birthlastname;
		prezimeV.value = d.maritallastname;

		datumR.value = d.birthday;
		mjestoR.value = d.birthplace;
		datumS.value = d.deathday;
		mjestoS.value = d.deathplace;
		note.value = d.note;

		setVisible(selectedID, true);
		selectedID.innerHTML = d.id;

		if (d.targetLinks[0]) returnFatherId(d);
	} catch (err) {
		//console.error(err);
		return;
	}
}

export function emptyInputBoxes() {
	ime.value = "";
	prezimeR.value = "";
	prezimeV.value = "";

	datumR.value = "";
	mjestoR.value = "";
	datumS.value = "";
	mjestoS.value = "";
	note.value = "";

	idF.value = "";
	idM.value = "";
}

export {
	cards, inputBox, note,
	ime, prezimeR, prezimeV,
	datumR, datumS,
	mjestoR, mjestoS,
	idF, idM,
}