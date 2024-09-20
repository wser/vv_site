import snarky from './snarky.js'
import './purify.js'

import { time } from "./time.js"

const c = e => console.log(e)

// add main content
const html = fetch("./vv.md")
html
    .then(res => res.text())
    .then(txt => snarky(txt))
    .then(val => document.querySelector("#content").innerHTML = val)
    .catch(e=>c(e))

// add used tech stack
// const tech = fetch("./tech.md")
// tech
//     .then(res=>res.text())
//     .then(t=>document.querySelector("#tech").innerHTML = clean(snarky(t)))
//     .catch(e=>c(e))


time()


