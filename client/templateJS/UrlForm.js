/**
 * Created by awaseem on 15-05-02.
 */

Template.urlForm.onCreated(function () {
    Session.setDefaultPersistent("localUrlKeys", []);
});

Template.urlForm.helpers({
    formResults: function () {
        return Session.get("formResults")
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
            localUrlKeys.unshift({
                urlKey: results,
                urlValue: url
            });
            Session.setPersistent("localUrlKeys", localUrlKeys);
            Session.set("formResults", results);
        });

        event.target.url.value = "";

        return false;
    }
});