import snarky from './snarky.js'
import './purify.min.js'

const c = e => console.log(e)
const clean = e => DOMPurify.sanitize(e)

const html = fetch("./vv.md")
html
    .then(res=>res.text())
    .then(t=>document.getElementById("content").innerHTML = clean(snarky(t)))
    .catch(e=>c(e))

const tech = fetch("./tech.md")
tech
    .then(res=>res.text())
    .then(t=>document.getElementById("tech").innerHTML = clean(snarky(t)))
    .catch(e=>c(e))
