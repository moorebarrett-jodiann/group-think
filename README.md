# Group Think Social

### Table of contents
- [Demo](https://moorebarrett-jodiann.github.io/group-think/)
- [Description](#description)
- [Functionalities](#functionalities)
- [Fetch API](#fetch-api)

## Description

Simple, desktop-first social media website, built using the following technologies:
- HTML
- CSS
- EcmaScript (ES)
- Local Storage
- ES Fetch API
- [Random User Generator API](https://randomuser.me/)

![Group Think](./src/images/screenshots/Group-Think.png?raw=true "Group Think")

## Functionalities

There are a few interactive features of the application:

#### Login

On the login page, the profile is quickly created by entering a random email and password. On initial `submit`, the email and password values are stored in the browser's local storage. This will act as the applications 'database'.

After this, every subsequent login with that email and password will be valid. Any other email/password combination will be flagged as incorrect.

#### Logout

After being redirected to the timeline of the application, the logout button is located to the right of the profile thumbnail photo at the top right of the screen. When clicked, the user is redirected back to the login page.

#### People you may know

On the timeline view, the list of users seen are all retrieved from an open-source Random User Generator API. 

If the page is refreshed a new list of random users are generated.

#### Adding posts to timeline

By default, there are 2 static posts on the timeline, however you may generate new content simply by typing in the texarea and/or uploading your favourite images. Each post will be timestamped and added to the top of the post area. 

#### LinkedIn link

The LinkedIn Hyperlink opens a new tab in the browser to my LinkedIn page. 
###### Let's Connect !! 😁👍 #####

#### Responsive Navigation

When the browser is resized to fit tablet or mobile dimensions, the navigation options change from horizontal to vertical orientation. The vertical navigation is revealed when the burger icon is clicked.

#### Responsive Page Content

When the browser is resized to fit tablet or mobile dimensions, the main content adjusts from a 3 column display to a 1 column display, where each column is stacked on top of each other.

## Fetch API

[(Back to top)](#table-of-contents)

The Fetch API provides a generic definition of ```Request``` and ```Response```
objects (and other things involved with network requests). It also defines
related concepts such as CORS and the HTTP Origin header semantics, supplanting
their separate definitions elsewhere. Fetch returns a ```Promise```, an object
represents the eventual completion (or failure) of an asynchronous operation
and its resulting value.

#### Asynchronous functions

The magic of ```async``` functions is that we can write asynchronous code that
looks like synchronous code. It's still asynchronous code but instead of
results and errors landing inside callback functions, errors are thrown
naturally as exceptions and results naturally land on the next line of code.

The key features of ```async``` functions are:

- ```async``` functions implicitly create and return promises.
- In an ```async``` function, ```await``` consumes promises, marking a point
  where the code will wait asynchronously for the promise to settle.
- While the function is waiting for the promisse to settle, the thread can run
  other code.
- Exceptions are rejections, and rejections are exceptions; returns are
  resolutions, and fulfillments are results (that is, if you ```await``` a
  promise, you see the promise's fulfillment value as the result of the ```await```
  expression).

#### Fetch API in action

The simplest use of ```fetch()``` takes one argument - the path to the resource
you want to fetch - and does not directly return the JSON response body but
instead returns a ```Promise``` that resolves with a ```Response``` object.

The ```Response``` object, in turn, does not directly contain the actual JSON
response body but is instead a representation of the entire HTTP response. So,
to extract the JSON body content from the ```Response``` object, we use the
```json()``` method, which returns a second promise that resolves with the
result of parsing the response body text as JSON.

```javascript
// fetch 10 users
const url = 'https://randomuser.me/api/?nat=CA&results=10';

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    mode: 'cors'
};

async function getUsers() {
    try {
        const result = await fetch(url, options);
        if(result.status >= 200 && result.status < 400) {
            const users = await result.json();
            //show users retrieved
            users.forEach(user => {
                console.log(user);
            });
        }
    } catch(error) {
        console.log(error.message);
    }
}

getUsers();
```

#### CORS

[(Back to top)](#table-of-contents)

Cross-Origin Resource Sharing (CORS) is a protocol that enables scripts running
on a browser client to interact with resources from a different origin. This is
useful because, thanks to the same-origin policy followed by ```fetch```,
JavaScript can only make calls to URLs that live on the same origin as the
location where the script is running. For example, if a JavaScript app wishes
to make an AJAX call to an API running on a different domain, it would be
blocked from doing so thanks to the same-origin policy.

#### References

- [JavaScript cookbook](https://www.oreilly.com/library/view/javascript-cookbook-3rd/9781492055747/)
- [JavaScript: the new toys](https://www.wiley.com/en-us/JavaScript:+The+New+Toys-p-9781119367963)
- [Professional JavaScript for web developers](https://www.wiley.com/en-us/Professional+JavaScript+for+Web+Developers%2C+4th+Edition-p-9781119366447)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
