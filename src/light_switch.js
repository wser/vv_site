const page = document.getElementById("page")
const child = document.createElement('div')
child.class = "toggle-group"
child.style = "float: right; margin-right: 0em;"
child.innerHTML = `
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
const lightS = page.insertAdjacentElement('afterbegin', child)


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