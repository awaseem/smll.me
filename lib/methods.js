/**
 * Created by ali on 4/13/15.
 */

Meteor.methods({
    insert: function (text) {
        Urls.insert({
            text: text
        });
    }
});