/**
 * Created by ali on 4/13/15.
 */

Meteor.methods({

    insertUrl: function (url) {
        var urlKey = ShortId.generate();

        Urls.insert({
            urlKey: urlKey,
            urlRedirect: url,
            hitCounter: 0,
            hitDates: [],
            country: [],
            website: []
        });

        return urlKey;
    },

    deleteUrl: function (urlKey) {
        Urls.remove({
            urlKey: urlKey
        });
    },

    updateUrl: function(urlKey, country, website) {
        Urls.update( {urlKey: urlKey}, {
            $inc: { hitCounter: 1 },
            $push: {
                country: country,
                website: website
            }
        });
    },

    test: function () {
        headers.ready(this);
    }
});