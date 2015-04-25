/**
 * Created by ali on 4/13/15.
 */

Meteor.methods({

    insertUrl: function (url) {
        var urlKey = ShortId.generate();

        Urls.insert({
            urlKey: urlKey,
            urlRedirect: url,
            dateCreated: new Date(),
            totalHits: 0,
            dates: {},
            browsers: { Unknown: 0 },
            os: { Unknown: 0 },
            referer: { Unknown: 0 }
        });

        return urlKey;
    },

    deleteUrl: function (urlKey) {
        Urls.remove({
            urlKey: urlKey
        });
    },


    updateUrl: function(key, headers) {
        var urlObj = Urls.findOne({ urlKey: key});

        urlObj.totalHits += 1;

        // set the counters for the year, month and day when the link is clicked
        urlObj.dates = setDate(urlObj.dates);

        // get platform information (os, browser, etc..)
        if (headers["user-agent"]) {
            var userInfo = platform.parse(headers["user-agent"]);
            urlObj.browsers = setBrowser(urlObj.browsers, userInfo.name);
            urlObj.os = setOs(urlObj.os, userInfo.os.family);
        }
        else {
            urlObj.browsers.Unknown += 1;
            urlObj.os.Unknown += 1;
        }

        // get the referer link (i.facebook.com)
        if (headers["referer"]) {
            var hostname = url.parse(headers["referer"]).hostname.replace(/\./g, ":");
            urlObj.referer = setReferer(urlObj.referer, hostname);
        }
        else {
            urlObj.referer.Unknown += 1;
        }

        // finally try to update the database with all the values, if there is any type of
        // error, just ignore the hit
        try {
            Urls.update({ urlKey: key}, {$set: urlObj});
        }
        catch (err) {
            console.log(err);
            return;
        }
    }

});

// This needs to change, because of time I created this function to help sort the dates
// and there counts. This will make it a lot easier for chart js to pull the information.
function setDate(urlDateObj) {
    var year = moment().year();
    var month = moment().format("MMMM");
    var day = moment().date();
    if (urlDateObj[year]){
        if (urlDateObj[year][month]) {
            if (urlDateObj[year][month][day]) {
                urlDateObj[year].count += 1;
                urlDateObj[year][month].count += 1;
                urlDateObj[year][month][day].count += 1;
            }
            else {
                urlDateObj[year].count += 1;
                urlDateObj[year][month].count += 1;
                urlDateObj[year][month][day] = {
                    count: 1
                }
            }
        }
        else {
            urlDateObj[year].count += 1;
            urlDateObj[year][month] = {
                count: 1
            };
            urlDateObj[year][month][day] = {
                count: 1
            };
        }
    }
    else {
        urlDateObj[year] = {
            count: 1
        };
        urlDateObj[year][month] = {
            count: 1
        };
        urlDateObj[year][month][day] = {
            count: 1
        };
    }

    return urlDateObj
}

// set the browser name
function setBrowser(browserObj, browserName) {
    if (browserName) {
        browserName = browserName.replace(/[^A-Z0-9]/ig, "");
        if (browserObj[browserName]) {
            browserObj[browserName] += 1;
        }
        else {
            browserObj[browserName] = 1;
        }
    }
    else {
        browserObj.Unknown += 1;
    }
    return browserObj;
}
// set os
function setOs(osObj, osName) {
    if (osName) {
        osName = osName.replace(/[^A-Z0-9]/ig, "");
        if (osObj[osName]) {
            osObj[osName] += 1;
        }
        else {
            osObj[osName] = 1;
        }
    }
    else {
        osObj.Unknown += 1;
    }
    return osObj;
}

// set referer link
function setReferer(refObj, refName) {
    if (refName) {
        if (refObj[refName]) {
            refObj[refName] += 1;
        }
        else {
            refObj[refName] = 1;
        }
    }
    else {
        refObj.Unknown += 1;
    }
    return refObj;
}

