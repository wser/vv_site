import { csv } from 'd3';

//main.js
import { c, zoomIt, eventFire, isEmpty } from './utils'
import { dataSource, prepareData } from './data'
import { lsTheme, lsId, lsData } from './ls'
import { $ } from './constants'
import { interactionBtns } from './buttons'
import { returnMode } from './decoration'
import { loadingAnimation } from './interaction'
import { drawGraph } from './graph'
//import { regSW } from './regsw'

function main(){
  // get data to display
  let src = isEmpty(lsData)
    ? 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(lsData) // local storage data
    : dataSource; // data from outer source

  csv(src) // load data
    .then((data) => prepareData(data))
    .then(() => drawGraph())
    .then(() => zoomIt())
    .then(() => returnMode(lsTheme)) // get local storage theme state
    .then(() => eventFire($(`#rect-${lsId}`), 'click')) // click on start to saved id in local storage
    //.then(() => eventFire(info, 'click')) // open info cards on start to display details selected about node
};

loadingAnimation() // loading element
interactionBtns() // buttons interactivity
main() // magic
// regSW() // register service worker

// v.1.7