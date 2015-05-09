/**
 * Created by awaseem on 15-04-25.
 */

Template.results.helpers({
    urlResults: function() {
        var urlKey = Session.get("urlKey");
        return Urls.findOne({ urlKey: urlKey})
    },
    formatTime: function (timeStamp) {
        return moment(timeStamp).format("MMM, Do YYYY")
    }
});

Template.results.onRendered(function () {
    $("#heading").each(function () {
        var letters = $(this).text().split('');
        $(this).text('');
        for(var i = 0; i < letters.length; i++){
            var spanStartHeader = "<span style='color: " + randomColor({luminosity: 'dark'}) + "'>" + letters[i] + "</span>";
            $(this).append(spanStartHeader);
        }
    })
});