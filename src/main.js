import snarky from '../public/snarky.js'

const c = e => console.log(e)
const html = fetch("vv.md")

html
    .then(res=>res.text())
    .then(t=>document.getElementById("content").innerHTML = snarky(t))
    .catch(e=>c(e))
