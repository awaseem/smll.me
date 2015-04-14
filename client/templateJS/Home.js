/**
 * Created by ali on 4/13/15.
 */

Meteor.subscribe("urls");

Template.home.helpers({
    test: function () {
        return Urls.find({});
    }
});

Meteor.call("insert", "hello world");