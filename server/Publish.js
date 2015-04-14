/**
 * Created by ali on 4/13/15.
 */
Meteor.publish("urls", function () {
    return Urls.find();
});