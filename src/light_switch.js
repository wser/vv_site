export const light_switch = () => {    
// set light_switch state
    const colorScheme = document.getElementById("colorScheme")
    colorScheme.addEventListener('change', e => {
        localStorage.setItem('color-scheme', e.target.value)
    })

//get local storage scheme state
    const scheme = localStorage.getItem('color-scheme') || 'auto'
   //if (scheme) document.documentElement.style.setProperty('--darkmode', scheme)
   const selected = [...colorScheme.elements].filter(e=> e.value === scheme)
   if(selected) selected[0].checked = true;
}