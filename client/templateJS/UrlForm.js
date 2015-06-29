/**
 * Created by awaseem on 15-05-02.
 */

Template.urlForm.onCreated(function () {
    Session.setDefaultPersistent("localUrlKeys", []);
    Session.setDefaultPersistent("firstTimeVisitor", true);
});

Template.urlForm.helpers({
    formResults: function () {
        return Session.get("formResults");
    },
    localUrlKeys: function () {
        return Session.get("localUrlKeys");
    },
    captchaEmpty: function () {
        return Session.get("captchaEmpty");
    },
    loadingNewLink: function () {
        return Session.get("loadingNewLink")
    },
    firstTimeVisitor: function () {
        return Session.get("firstTimeVisitor")
    }
});

Template.urlForm.events({
    "submit .urlEntry": function (event) {
        var url = event.target.url.value;
        var captcha = grecaptcha.getResponse();

        // As soon as the user hits the submit button, reset the form results and trigger a loading spinner
        Session.set("formResults", undefined);
        Session.set("loadingNewLink", true);

        Meteor.call("insertUrl", url, captcha, function(error, results) {
            // Check to see if the captcha was successful, if not let the user know and don't create a new link
            if (results === false ) {
                Session.set("captchaEmpty", true);
                Session.set("loadingNewLink", false);
                return
            }
            else {
                Session.set("captchaEmpty", false);
                event.target.url.value = "";
                grecaptcha.reset();
            }
            // Add the new link to the users local storage
            var localUrlKeys = Session.get("localUrlKeys");
            if (url.length >= 25) {
                url = url.substring(0, 22) + "...";
            }
            localUrlKeys.push({
                urlKey: results,
                urlValue: url
            });
            // Disable the loading screen and show the user the results
            Session.setPersistent("localUrlKeys", localUrlKeys);
            Session.set("loadingNewLink", false);
            Session.set("formResults", results);
        });

        return false;
    },

    "click .delete-button": function () {
        var localUrlKeys = Session.get("localUrlKeys");
        for (var i = 0; i < localUrlKeys.length; i++) {
            if (this.urlKey == localUrlKeys[i].urlKey) {
                localUrlKeys.splice(i, 1);
            }
        }
        Session.setPersistent("localUrlKeys", localUrlKeys);
        // if the user is deleting a url that is being displayed, then hide the results
        if (Session.get("formResults") === this.urlKey) {
            Session.set("formResults", undefined);
        }
        Meteor.call("deleteUrl", this.urlKey);
    },

    "click #hide-link-button": function () {
        Session.set("formResults", undefined);
    },

    "click #first-time-alert": function () {
        Session.setPersistent("firstTimeVisitor", false);
    }
});

Template.urlForm.onRendered(function () {
    $('.smll-title-text').each(function() {
        var animations = ["bounce", "rubberBand", "swing", "tada", "pulse", "flash"];
        var letters = $(this).text().split('');
        $(this).text('');
        for(var i = 0; i < letters.length; i++){
            var spanStartHeader = "<span style='color: " + randomColor({luminosity: 'light'}) + "'>" + letters[i] + "</span>";
            $(this).append(spanStartHeader);
        }
        $(this).addClass("animated infinite " + animations[Math.floor(Math.random() * animations.length)]);
    });
});