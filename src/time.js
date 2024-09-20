const tauSeprtr = n => `${n}`.replace(/(?<!\.\d+)\B(?=(\d{3})+\b)/g, ".").replace(/(?<=\.(\d{3})+)\B/g, ".")
const randomT = t => Math.floor(Math.random() * t.length)

export const time = () => {
// create time counters
  const myTime = document.querySelector("#mytime")
  const initial = '1981-07-03T11:54:55.373Z'
  const startDate = new Date(initial)

  setInterval(() => {
    requestAnimationFrame(()=> {    
      let endDate = new Date()
      let difference = (endDate - startDate)    

      const timeObj = {
        sec: { title: 'age in seconds', val: parseInt(difference/1000) },
        min: { title: 'age in minutes', val: parseInt(difference/(1000*60)) },
        hrs: { title: 'age in hours',   val: parseInt(difference/(1000*60*60)) },
        dys: { title: 'age in days',    val: parseInt(difference/(1000*60*60*24)) },
        mts: { title: 'age in months',  val: parseInt(difference/(1000*60*60*24*30)) },
        yrs: { title: 'age in years',   val: parseInt(difference/(1000*60*60*24*30*12)) },
      }

      let tKeys = Object.keys(timeObj)
      let rndT = timeObj[tKeys[randomT(tKeys)]]

        myTime.innerHTML = `
          <p>${rndT.title}</p>    
          <p>${tauSeprtr(rndT.val)}</p>
        `      
      })
    }, 
  1000)
}