/**
 * Created by ali on 5/9/15.
 */
Meteor.startup(function() {
    reCAPTCHA.config({
        theme: 'light',  // 'light' default or 'dark'
        publickey: '6LergAYTAAAAALVcWDJ4xrueXW-vnh45a9hl6pN2'
    });
});