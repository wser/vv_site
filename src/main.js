import snarky from './snarky.js'
import './purify.js'

const c = e => console.log(e)
const clean = e => DOMPurify.sanitize(e)
const tauSeprtr = n => `${n}`.replace(/(?<!\.\d+)\B(?=(\d{3})+\b)/g, ".").replace(/(?<=\.(\d{3})+)\B/g, ".")

// add main content
const html = fetch("./vv.md")
html
    .then(res=>res.text())
    .then(t=>document.querySelector("#content").innerHTML = clean(snarky(t)))
    .catch(e=>c(e))

// add used tech stack
const tech = fetch("./tech.md")
tech
    .then(res=>res.text())
    .then(t=>document.querySelector("#tech").innerHTML = clean(snarky(t)))
    .catch(e=>c(e))


// create time counters
const myTime = document.querySelector("#mytime")
const initial = '1981-07-03T11:54:55.373Z'
const startDate = new Date(initial)

setInterval(() => {
  requestAnimationFrame(()=> {    
    let endDate = new Date()
    let difference = (endDate - startDate) 

    let sec = parseInt(difference/1000)
    let min = parseInt(difference/(1000*60))
    let hrs = parseInt(difference/(1000*60*60))
    let dys = parseInt(difference/(1000*60*60*24))
    let mts = parseInt(difference/(1000*60*60*24*30))
    let yrs = parseInt(difference/(1000*60*60*24*30*12))

    myTime.innerHTML = `
      <p>years: ${tauSeprtr(yrs)}</p>
      <p>months: ${tauSeprtr(mts)}</p>
      <p>days: ${tauSeprtr(dys)}</p>
      <p>hours: ${tauSeprtr(hrs)}</p>
      <p>minutes: ${tauSeprtr(min)}</p>
      <p>seconds: ${tauSeprtr(sec)}</p>
    `})
}, 1000)


