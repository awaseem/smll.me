/**
 * Created by ali on 4/13/15.
 */

var chartLabel = [];
var chartData = [];
var chart;

Template.yearChart.helpers({
    // put any helpers here
});

Template.yearChart.onRendered(function () {
    var chartRendered = false;

    var currentYear = moment().year();
    var urlDates = Urls.findOne( {urlKey: "Vyw1ZiGz"} ).dates;

    for (month in urlDates[currentYear]) {
        if (month === "count") { continue; }
        chartLabel.push(month);
        chartData.push(urlDates[currentYear][month].count);
        console.log(chartData);
    }

    chart = generateBarGraph(chartLabel, chartData, "myChart", function () {
        chartRendered = true;
    });

    this.autorun(function () {
        if (chartRendered) {
            urlDates = Urls.findOne( {urlKey: "Vyw1ZiGz"}).dates;
            upsertBarGraph(chartLabel, urlDates[currentYear], chart);
        }
    });
});

//Meteor.call("insertUrl", "https://www.facebook.com");
//Meteor.call("deleteUrl", "Vyw1ZiGz");