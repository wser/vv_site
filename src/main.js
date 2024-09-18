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

const myTime = document.getElementById("mytime")
const initial = '1981-07-03T11:54:55.373Z'

function interval(){
  let startDate = new Date(initial)
  let endDate = new Date()
  return parseInt((endDate - startDate) / 1000); 
}
let seconds = setInterval(() => {requestAnimationFrame(()=> myTime.innerHTML = interval())},1000)

