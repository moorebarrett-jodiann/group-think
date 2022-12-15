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

const form = select('form');
const submit = select('.submit');
const createAcctBtn = select('.create-account');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

/**---------------------------------------------------------------------------- */

/**----------------------- Login Validation and Redirect ---------------------- */

function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function validate () {
    let email = select('.email').value.trim();
    let password = select('.password').value.trim();
  
    let message = '';
    let valid = true;
    
    if(email.length === 0 || password.length === 0) {
        message = 'Your Email and Password are required\n';
        valid = false;
    } 
    
    else if(email.length > 0 && !emailRegex.test(email)) {
        message = 'Your Email and Password are incorrect\n';
        valid = false;
    }
  
    if (!valid) {
        alert(message);
    } else {
        // retrieve email and password from local storage
        const credentials = JSON.parse(localStorage.getItem('credentials') || "[]");
        //if local storage is not empty compare user login credentials
        if(!isObjectEmpty(credentials)) {
            let savedEmail = '';
            let savedPassword = '';
            for(const credential of credentials) {
                savedEmail = credential.email;
                savedPassword = credential.password;
            }
            // compare input with local storage values
            if(savedEmail === email && savedPassword === password) {
                window.location.href = 'home.html';
            } else {
                message = 'Your Email and Password are incorrect\n';
                alert(message);
                form.reset();
            }
        // otherwise save first time login values to local storage
        } else {
            const credentials = [
                {email: email, password: password}
            ];
            localStorage.setItem('credentials', JSON.stringify(credentials));
            window.location.href = 'home.html';
        }
    }
}

onEvent('click', submit, function () {
    validate();
});

onEvent('click', createAcctBtn, function (e) {
    e.preventDefault();
});

/**---------------------------------------------------------------------------- */

/**-------------------------- Retrieve Random Users --------------------------- */

/**---------------------------------------------------------------------------- */

/**----------------------- Other functions and Events ------------------------- */

onEvent('load', window, () => {
    form.reset();
});

/**---------------------------------------------------------------------------- */