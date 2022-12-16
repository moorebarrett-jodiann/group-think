'use strict';

/*----------------------------------------------------------------------------- *
 * Group Think
 * Jodi-Ann Barrett
 * 
 * */

// Utility Functions 
function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

// Select HTML element by class, id and html element
function select(selector, parent = document) {
  return parent.querySelector(selector);
}

/**---------------------------------------------------------------------------- */

/**--------------------------------- Data ------------------------------------- */

const url = 'https://randomuser.me/api/?nat=CA&results=10';
const userContainer = select('.row .card .users');
const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    mode: 'cors'
};

const form = select('form');
const gridBox = select('.grid');
const postInput = select('.post-input');
const postFile = select('.post-file');
const fileNameSpan = select('.file-name-selected');
const createPost = select('.create-post');
const message = select('.message');

/**---------------------------------------------------------------------------- */

/**----------------------------- Generate Users ------------------------------- */

async function getUsers() {
    try {
        const result = await fetch(url, options);
        if(result.status >= 200 && result.status < 400) {
            const users = await result.json();
            printUsers(users.results);
        }
    } catch(error) {
        console.log(error.message);
    }
}

// function to build user cards
function printUsers(users) {
    users.forEach(user => {
        var div = document.createElement('div');
        const picture = user.picture?.medium;
        const name = `${user.name?.first} ${user.name?.last}`;
        const city = user.location?.city;
        const country = user.location?.country;
        
        div.classList.add('user-cards');
        div.innerHTML = `
            <div class="user-card flexbox">
                <div class="img">
                    <img src=${picture}>
                </div>
                <div class="details">
                    <p class="name">${name}</p>
                    <p class="city">${city}</p>
                </div>
                <div class="connect">
                    <i class="fa-solid fa-plus"></i>
                </div>
            </div>
        `;
        userContainer.appendChild(div);
    });
}

// when page is loaded populate grid
onEvent('load', window, () => {
    getUsers();
});

/**---------------------------------------------------------------------------- */

/**--------------------------------- Timeline --------------------------------- */

// submit form
function submitForm(postInput, postFile) {
    
    try {
        window.URL = window.URL || window.webkitURL;
        let url = (postFile.value !== '') ? URL.createObjectURL(postFile.files[0]) : '';
        let image = select('.avatar .img').innerHTML;
        let today = new Date().toLocaleDateString('en-ca', { year:"numeric", month:"short", day:"numeric"});

        // build posts in grid
        var div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <div class="post-header flexbox">
                <div class="post-profile-pic">${image}</div>
                <h4 class="profile-name">Jodi-Ann Barrett</h4>
                <p class="post-date">${today}</p>
            </div>
            <div class="post-body">
                <p>${postInput.value}</p>
                <div class="post-body-img">
                    <img src="${url}"/>
                </div>
            </div>
        `;
        gridBox.prepend(div);

    } catch (error) {
        message.innerHTML = `<p class="invalid">${error}</p>`;
    }
}

// function to validate form input
function validateFormInput () {
    if(postInput.value === '' && postFile.value === '') {
        message.innerHTML = `<p class="invalid">Your post cannot be empty.</p>`;
    } else {
        submitForm(postInput, postFile);
        postInput.value = '';
        postFile.value = '';
        fileNameSpan.innerText = '';
    }
}

// validate form when add button is clicked
onEvent('click', createPost, function (event) {
    event.preventDefault();
    validateFormInput();
});

// when file is selected show the file name to the user
onEvent('change', postFile, function() {
    // extract name of the file:
    fileNameSpan.innerText = this.files[0].name.trim();
});

// when page is reloaded clear grid and form
onEvent('load', window, () => {
    fileNameSpan.innerText = '';
    form.reset();
});
