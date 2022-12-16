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

/**---------------------------------------------------------------------------- */

/**---------------- Login Validation and Redirect ----------------------------- */

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
                    <p class="city">${city}, ${country}</p>
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