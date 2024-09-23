import snarky from './snarky.js'
import { time } from "./time.js"
import { light_switch } from "./light_switch.js"
const c = e => console.log(e)

const lightSwitch = `
  <fieldset class="toggle-group" id="colorScheme">
    <label>
      <input type="radio" name="color-scheme" id="color-scheme-light" value="0" data-sr>
      Light
    </label>
    <label>
      <input type="radio" name="color-scheme" value="auto" checked data-sr>
      Auto
    </label>
    <label>
      <input type="radio" name="color-scheme" id="color-scheme-dark" value="1" data-sr>
      Dark
    </label>
  </fieldset>
`

// add main content
const html = fetch("./vv.md")
html
    .then(res => res.text())
    .then(txt => snarky(txt))
    .then(val => document.querySelector("#content").innerHTML = lightSwitch+val)
    .catch(e=>c(e))

// // add used tech stack
// const tech = fetch("./stack.md")
// tech
//     .then(res=>res.text())
//     .then(txt => snarky(txt))
//     .then(val => document.querySelector("#tech").innerHTML = val)
//     .catch(e=>c(e))




window.addEventListener('load', async e => {
    // display time passed
    await time()
    await light_switch()
})