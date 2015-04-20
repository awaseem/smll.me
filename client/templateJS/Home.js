/**
 * Created by ali on 4/13/15.
 */

Meteor.subscribe("urls");

Template.home.helpers({
    test: function () {
        console.log(Urls.findOne({ urlKey: "Eym2M8p-" }));
        return Urls.find({});
    }
});

Template.home.onRendered(function () {
    var data = [
        {
            value: 300,
            color:"#F7464A",
            highlight: "#FF5A5E",
            label: "Red"
        },
        {
            value: 50,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Green"
        },
        {
            value: 100,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Yellow"
        }
    ];
    var ctx = $("#myChart").get(0).getContext("2d");
    var myPieChart = new Chart(ctx).Pie(data);

    Tracker.autorun(function () {
        var count = Urls.findOne( {urlKey: "VyTCxaI-"});
        if (count) {
            console.log(count);
        }
        myPieChart.segments[1].value += 10;
        myPieChart.update();
    });

});

//Meteor.call("insertUrl", "http://www.facebook.com");
//Meteor.call("deleteUrl", "Eym2M8p-");