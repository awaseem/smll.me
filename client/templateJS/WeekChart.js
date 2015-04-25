/**
 * Created by ali on 15-04-23.
 */

var chartLabel = [];
var chartData = [];
var chart;

Template.weekChart.helpers({
    // put any helpers here
});

Template.weekChart.onRendered(function () {
    var chartRendered = false;

    var currentYear = moment().year();
    var currentMonth = moment().format("MMMM");
    var urlDates = Urls.findOne( {urlKey: "Vyw1ZiGz"}).dates;

    for (day in urlDates[currentYear][currentMonth]) {
        if (day === "count") { continue; }
        chartLabel.push(day);
        chartData.push(urlDates[currentYear][currentMonth][day].count);
    }

    chart = generateBarGraph(chartLabel, chartData, "myChart", function () {
        chartRendered = true;
    });

    this.autorun(function () {
        if (chartRendered) {
            urlDates = Urls.findOne( { urlKey: "Vyw1ZiGz"}).dates;
            upsertBarGraph(chartLabel, urlDates[currentYear][currentMonth], chart);
        }
    });
});