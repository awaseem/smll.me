/**
 * Created by awaseem on 15-05-02.
 */

Template.urlForm.onCreated(function () {
    Session.setDefaultPersistent("localUrlKeys", []);
});

Template.urlForm.helpers({
    formResults: function () {
        return Session.get("formResults");
    },
    localUrlKeys: function () {
        return Session.get("localUrlKeys");
    }
});

Template.urlForm.events({
    "submit .urlEntry": function (event) {

        var url = event.target.url.value;

        Meteor.call("insertUrl", url, function(error, results) {
            var localUrlKeys = Session.get("localUrlKeys");
            if (url.length >= 25) {
                url = url.substring(0, 22) + "...";
            }
            localUrlKeys.push({
                urlKey: results,
                urlValue: url
            });
            Session.setPersistent("localUrlKeys", localUrlKeys);
            Session.set("formResults", results);
        });

        event.target.url.value = "";

        return false;
    },

    "click .delete-button": function () {
        var self = this;
        var localUrlKeys = Session.get("localUrlKeys");
        for (var i = 0; i < localUrlKeys.length; i++) {
            if (self.urlKey == localUrlKeys[i].urlKey) {
                localUrlKeys.splice(i, 1);
            }
        }
        Session.setPersistent("localUrlKeys", localUrlKeys);
        Meteor.call("deleteUrl", self.urlKey);
    },

    "click #hide-link-button": function () {
        Session.set("formResults", undefined);
    }
});

Template.urlForm.onRendered(function () {
    $('.smll-title-text').each(function(){
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