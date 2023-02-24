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

const form = select('.login-container-full form');
const formTM = select('.login-container-tablet-mobile form');
const submit = select('.login-container-full .submit');
const submitTM = select('.login-container-tablet-mobile .submit');
const createAcctBtn = select('.login-container-full .create-account');
const createAcctBtnTM = select('.login-container-tablet-mobile .create-account');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const messageContainer = select('.login-container-full .message');
const messageContainerTM = select('.login-container-tablet-mobile .message');
const togglePassword = select('.login-container-full #toggle-password');
const togglePasswordTM = select('.login-container-tablet-mobile #toggle-password');
const email = select('.login-container-full .email');
const emailTM = select('.login-container-tablet-mobile .email');
const password = select('.login-container-full .password');
const passwordTM = select('.login-container-tablet-mobile .password');
const allInput = selectAll('.login-container-full .login-view form input:not([type="checkbox"])');
const allInputTM = selectAll('.login-container-tablet-mobile .login-view form input:not([type="checkbox"])');
const mediaQuery = window.matchMedia('(max-width: 922px)');

// const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

/**---------------------------------------------------------------------------- */

/**----------------------- Login Validation and Redirect ---------------------- */

function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}

onEvent('resize', window, () => {
    
    // detect media query on window load to trigger tablet/mobile elements versus desktop elements
    if (mediaQuery.matches) {
        
        function validate () {
            let emailVal = emailTM.value.trim();
            let passwordVal = passwordTM.value.trim();
        
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
                messageContainerTM.innerHTML = `<p class="invalid">${message}</p>`;
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
                        messageContainerTM.innerHTML = `<p class="invalid">${message}</p>`;
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
        onEvent('click', submitTM, function () {
            validate();
        });
        
        // disable default behavior of create contact button
        onEvent('click', createAcctBtnTM, function (e) {
            e.preventDefault();
        });
        
        // toggle show password for login
        onEvent('click', togglePasswordTM, function(){
            const type = passwordTM.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordTM.setAttribute('type', type);
            if(this.classList.contains('fa-eye-slash')) {
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });
        
        // trigger submit.click() when enter button is pressed on login page
        allInputTM.forEach(input => {
            onEvent('keypress', input, function(e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    submitTM.click();
                }
            });
        });

    } else {
        
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
    }
});

// when page is reloaded clear form
onEvent('load', window, () => {
    
    form.reset();

    // detect media query on window load to trigger tablet/mobile elements versus desktop elements
    if (mediaQuery.matches) {
        
        function validate () {
            let emailVal = emailTM.value.trim();
            let passwordVal = passwordTM.value.trim();
        
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
                messageContainerTM.innerHTML = `<p class="invalid">${message}</p>`;
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
                        messageContainerTM.innerHTML = `<p class="invalid">${message}</p>`;
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
        onEvent('click', submitTM, function () {
            validate();
        });
        
        // disable default behavior of create contact button
        onEvent('click', createAcctBtnTM, function (e) {
            e.preventDefault();
        });
        
        // toggle show password for login
        onEvent('click', togglePasswordTM, function(){
            const type = passwordTM.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordTM.setAttribute('type', type);
            if(this.classList.contains('fa-eye-slash')) {
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });
        
        // trigger submit.click() when enter button is pressed on login page
        allInputTM.forEach(input => {
            onEvent('keypress', input, function(e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    submitTM.click();
                }
            });
        });

    } else {
        
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
    }
});

/**---------------------------------------------------------------------------- */