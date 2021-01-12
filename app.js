//DOM VARIABLES

const input = document.getElementById('input');
const results = document.getElementById('results');
const submit = document.getElementById('submit');
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.nav-menu');
const copybuttons = document.querySelectorAll('.copybutton');
const error = document.getElementById('error');
const boostbutton = document.getElementById('boost-button');
const inputsectionwrapper = document.getElementById('input-section-wrapper');


//RESULTS AND COPYING FUNCTIONALITY 

async function initialize(url){

    const getting = await fetch(url);
    const data = await getting.json();

    const shortLink = data.result.full_short_link;
    const originalLink = data.result.original_link;
    const window = document.createElement('div');

    window.className = 'result';

    window.innerHTML = `<p class="link">${originalLink}</p>
    <p class="short">${shortLink}</p>
    <div class="copybutton" onclick = copyButton(this) data-copy = ${shortLink}>Copy</div>`

    results.appendChild(window);
}

function copyButton(index){

    index.style = `background-color: hsl(257, 27%, 26%)`;
    index.innerHTML = `Copied`;

    let link = index.dataset.copy;
    const dummy = document.createElement("textarea");

    document.body.appendChild(dummy);
    dummy.value = link;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}



submit.addEventListener('click' , () => {
    
    let value = input.value;
    if (window.screen.width < 1100){
    if(value === ''){
        console.error('Input empty')
        input.style = `border: 2px solid red;
        margin-bottom: 30px;`
        error.style = 'display:block;'
        
    }
    else{
        initialize(`https://api.shrtco.de/v2/shorten?url=${value}`);
        input.style = 'border: none;'
        error.style = 'display: none;'
        
    }
}
else{
    if(value === ''){
        console.error('Input empty')
        input.style = `border: 2px solid red;
        `
        error.style = 'display:block;'
        
    }
    else{
        initialize(`https://api.shrtco.de/v2/shorten?url=${value}`);
        input.style = 'border: none;'
        error.style = 'display: none;'
        
    }

}
})

//HAMBURGER MENU 

let state = 0;
hamburger.addEventListener('click' , () => {
    if(state === 0){
        menu.classList.toggle('active');
       
        hamburger.src = '/images/icon-close.svg'
        state++;
    }
    else if(state === 1){
       
        menu.classList.toggle('active');
        hamburger.src = '/images/icon-hamburger.svg';
        state--;
    }

})

//PAGE SCROLLING

boostbutton.addEventListener('click', () => {
    inputsectionwrapper.scrollIntoView();
})


