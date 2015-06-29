/**
 * Created by ali on 5/9/15.
 */
Meteor.startup(function() {
    reCAPTCHA.config({
        theme: 'light',  // 'light' default or 'dark'
        publickey: 'YOUR PUBLIC KEY HERE'
    });
});