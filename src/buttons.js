import { pointer } from 'd3'

import { $, $$, $d3, shareButton, sankeydata, contact, contacta } from './constants'
import { cards } from './input_boxes'
import { handleSelectedId } from './data';
import { returnMode, isDark } from './decoration';
import { isClicked, toggleInputFields, enlargeQR } from './interaction';
import { searchAsYouType } from './search'
import { createNew } from './node';

/* control buttons */
const info = $('#info');
const pencil = $('#pencil');
const exitz = $('#exitz');
const sendz = $('#sendz');
const displayMode = $('#displayMode');

let unconnectedNode = null;
export let editMode = false;

export const searchIcon = $('#search_icon');
export const qr = $('.imgContainer'); // QR code
export const selectedID = $('#ls-button'); // selected id
export const selectedID2 = $('#selected-item-id2'); // selected id2
export const lsContainer = $('.lsContainer'); // selected id container
export const selectedContainer2 = $('.selectedContainer2'); // selected id container

export const interactionBtns = () => {
  let isCl = isClicked


  //HEADER////////////////////////////
  // info button
  info.addEventListener('click', () => {
    cards.classList.toggle('active'); // toggle active class on element

    let totalInputFields = $$('.input').length;
    for (let i = 0; i < totalInputFields; i++) {
      let item = $(`#item-${i}`);
      item.disabled = true;
      item.classList.remove('selected');
    }
    pencil.style.backgroundColor = '';
    pencil.style.display = 'block';
    exitz.style.display = 'block';
    info.style.display = 'none';
    isCl = false;
  });

  // enter edit mode
  pencil.addEventListener('click', () => {
    isCl = !isCl;
    let show = isCl ? 'block' : 'none';

    editMode = true;
    sendz.style.display = show;
    selectedContainer2.style.display="flex"; // display add node container
    pencil.style.display = 'none'; // hide pencil
    toggleInputFields();
  });

  // exit edit mode
  exitz.addEventListener('click', () => {
    cards.classList.toggle('active');
    editMode = false;
    info.style.display = 'block'; // display info icon
    exitz.style.display = 'none'; // hide x icon
    sendz.style.display = 'none'; // hide sendz icon
    pencil.style.display = 'none'; // hide pencil
    selectedContainer2.style.display='none'; // hide node container
    qr.style.transform = 'scale(1) translate(0, 0)'; // minimize QR code
  });

  // update changes to db and graph
  sendz.addEventListener('click', () => {
    let q = 'are you sure?';
    let a = 'db update sent. All is good';
    confirm(q) == true ? alert(a) : null;
  });

  /* QRCode*/
  qr.addEventListener('click', enlargeQR);

  /* Search as you type initializer */
  $d3('#filterOn').on('keyup', searchAsYouType);

  /* Toggle dark-light mode */
  displayMode.addEventListener('click', () => returnMode(isDark));
  //////////////////////////////////////



  //BODY////////////////////////////
  // add ID to ls
  selectedID.addEventListener('click', () => {
    lsContainer.classList.toggle('selectedPersist'); // add visual indicator
    handleSelectedId(selectedID.innerHTML); // add selected id to ls
  });

  // add new node to graph
  selectedID2.addEventListener('click', () => {
    createNew()
  });
  //////////////////////////////////////



  //FOOTER////////////////////////////
  /* email contact */
  contact.addEventListener('click', (e) => {
    contacta.href = 'mailto:viktor.vidakovic@gmail.com';
    let url = contacta.href;
    let urlMod = url.replace('mailto:', '');
    let q = 'Send an email to: ' + urlMod;
    let path = contacta.href + '?subject=nota familia contact'; //email subject

    confirm(q) == true ? (document.location.href = path) : e.preventDefault(); // are u sure question
  });

  /* SHARE */
  shareButton.addEventListener('click', () => {
    // prettier-ignore
    navigator
      .share({title: 'Share this link', url: 'https://notafamilia.netlify.app',})
      .then(() => {console.log('Thanks for sharing!');})
      .catch(console.error);
  });
  //////////////////////////////////////
}