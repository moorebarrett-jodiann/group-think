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

// Select All HTML elements by class, id and html element
function selectAll(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

/**---------------------------------------------------------------------------- */

/**--------------------------------- Data ------------------------------------- */

const form = select('form');
const submit = select('.submit');
const createAcctBtn = select('.create-account');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const messageContainer = select('.message');
const togglePassword = select('#toggle-password');
const email = select('.email');
const password = select('.password');
const allInput = selectAll('.center .login-container .login-view form input:not([type="checkbox"])');

// const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

/**---------------------------------------------------------------------------- */

/**----------------------- Login Validation and Redirect ---------------------- */

function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function validate () {
    let emailVal = select('.email').value.trim();
    let passwordVal = select('.password').value.trim();
  
    let message = '';
    let valid = true;
    
    if(emailVal.length === 0 || passwordVal.length === 0) {
        message = 'Your Email and Password are required\n';
        valid = false;
    } else if(emailVal.length > 0 && !emailRegex.test(emailVal)) {
        message = 'Your Email and Password are incorrect\n';
        valid = false;
    }
  
    if (!valid) {
        messageContainer.innerHTML = `<p class="invalid">${message}</p>`;
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
            if(savedEmail === emailVal && savedPassword === passwordVal) {
                window.location.href = 'home.html';
            } else {
                message = 'Your Email and Password are incorrect\n';
                messageContainer.innerHTML = `<p class="invalid">${message}</p>`;
                form.reset();
            }
        // otherwise save first time login values to local storage
        } else {
            const credentials = [
                {email: emailVal, password: passwordVal}
            ];
            localStorage.setItem('credentials', JSON.stringify(credentials));
            window.location.href = 'home.html';
        }
    }
}

// validate input when submit button is clicked 
onEvent('click', submit, function () {
    validate();
});

// disable default behavior of create contact button
onEvent('click', createAcctBtn, function (e) {
    e.preventDefault();
});

// when page is reloaded clear form
onEvent('load', window, () => {
    form.reset();
});

// toggle show password for login
onEvent('click', togglePassword, function(){
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    if(this.classList.contains('fa-eye-slash')) {
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye');
    } else {
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
    }
});

// trigger submit.click() when enter button is pressed on login page
allInput.forEach(input => {
    onEvent('keypress', input, function(e) {
        if (e.key === "Enter") {
          e.preventDefault();
          submit.click();
        }
    });
});

/**---------------------------------------------------------------------------- */