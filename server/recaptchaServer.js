/**
 * Created by ali on 5/9/15.
 */
Meteor.startup(function() {
    reCAPTCHA.config({
        privatekey: 'YOUR PRIVATE KEY HERE'
    });
});