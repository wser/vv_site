const tauSeprtr = n => `${n}`.replace(/(?<!\.\d+)\B(?=(\d{3})+\b)/g, ".").replace(/(?<=\.(\d{3})+)\B/g, ".")
const randomT = t => Math.floor(Math.random() * t.length)
const c = e => console.log(e)
const startDate = new Date('1981-07-03T11:54:55.373Z')

const content = document.querySelector("#content")
const child = document.createElement('div')
child.id = "my-time"
const timeEl = content.insertAdjacentElement('afterend', child)
let clicked = false;
let timeObj = null;

const isClicked = () => {clicked = !clicked;}

const showElapsedSeconds = () => {  
  let endDate = new Date()
  let difference = (endDate - startDate)
  let sec = { title: 'age in seconds', val: parseInt(difference/1000) }
  timeEl.innerHTML = `<p>${sec.title}</p><p>${tauSeprtr(sec.val)}</p>`
  timeEl.style = "border: none"
}

// create time counters
const randomlySwitchUnit = () => {
  let endDate = new Date()
  let difference = (endDate - startDate)
  timeObj = {
    sec: { title: 'age in seconds', val: parseInt(difference/1000) },
    min: { title: 'age in minutes', val: parseInt(difference/(1000*60)) },
    hrs: { title: 'age in hours',   val: parseInt(difference/(1000*60*60)) },
    dys: { title: 'age in days',    val: parseInt(difference/(1000*60*60*24)) },
    mts: { title: 'age in months',  val: parseInt(difference/(1000*60*60*24*30)) },
    yrs: { title: 'age in years',   val: parseInt(difference/(1000*60*60*24*30*12)) },
  }
  let tKeys = Object.keys(timeObj)
  let rndT = timeObj[tKeys[randomT(tKeys)]]
  timeEl.innerHTML = `<p>${rndT.title}</p><p>${tauSeprtr(rndT.val)}</p>`
  timeEl.style = "border: 1px dashed var(--border-color); padding:0 4px 8px 4px; margin-bottom: 2px; border-radius: 8px; "
}

export const time = () => {
  timeEl.addEventListener('click', isClicked);
  setInterval(() => {!clicked ? showElapsedSeconds() : randomlySwitchUnit()}, 1000 )
}
