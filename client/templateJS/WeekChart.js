/**
 * Created by ali on 15-04-23.
 */

Template.weekChart.helpers({
    // put any helpers here
});

Template.weekChart.onRendered(function () {
    var chartLabel = [];
    var chartData = [];
    var chart;
    var currentYear = moment().year();
    var currentMonth = moment().format("MMMM");
    var chartRendered = false;

    this.autorun(function () {
        var urlKey = Session.get("urlKey");
        var urlDates = Urls.findOne( {urlKey: urlKey}).dates;

        if (jQuery.isEmptyObject(urlDates)) {
            // do some view routing here to display no chart data
            return;
        }

        if (!chartRendered) {
            // if the chart isn't rendered yet, render it!
            for (var day in urlDates[currentYear][currentMonth]) {
                if (day === "count") { continue; }
                chartLabel.push(day);
                chartData.push(urlDates[currentYear][currentMonth][day].count);
            }
            chart = generateBarGraph(chartLabel, chartData, "weekChart", function () {
                chartRendered = true;
            });
        }
        else {
            upsertBarGraph(chartLabel, urlDates[currentYear][currentMonth], chart);
        }
    });
});