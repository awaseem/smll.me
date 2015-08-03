# smll.me

Real time URL shortener that will update the results for every click in real time.

# Setup

The beauty of Meteor JS is that the setup and project dependencies are dead simple. Simply clone the repo
and run the following: 

`meteor`

You also need to setup reCaptcha keys (go here: https://www.google.com/recaptcha and register you web app):

Once you have your keys, add them to the following files: 

`server/recaptchaServer.js`:

```
Meteor.startup(function() {
    reCAPTCHA.config({
        privatekey: 'YOUR PRIVATE KEY HERE'
    });
});
```

`client/templateJS/recaptcha.js`:

```
Meteor.startup(function() {
    reCAPTCHA.config({
        theme: 'light',  // 'light' default or 'dark'
        publickey: 'YOUR PUBLIC KEY HERE'
    });
});
```



