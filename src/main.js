import snarky from './snarky.js'
// import * as JSDOM from './jsdom.min.js'
//import * as createDOMPurify from './purify.min.js'

const c = e => console.log(e)

const html = fetch("./vv.md")
//const window = new JSDOM('').window
//const DOMPurify = createDOMPurify(window)


html
    .then(res=>res.text())
    .then(t=>document.getElementById("content").innerHTML = snarky(t))
    .catch(e=>c(e))
