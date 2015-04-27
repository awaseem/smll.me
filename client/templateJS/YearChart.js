/**
 * Created by ali on 4/13/15.
 */

Template.yearChart.helpers({
    // put any helpers here
});

Template.yearChart.onRendered(function () {
    var chartLabel = [];
    var chartData = [];
    var chart;
    var chartRendered = false;
    // we want to display data just for the current year time frame, when the results were requested
    var currentYear = moment().year();

    this.autorun(function () {
        var urlKey = Session.get("urlKey");
        var urlDates = Urls.findOne( {urlKey: urlKey} ).dates;

        if (jQuery.isEmptyObject(urlDates)) {
            // do some view routing here to display no chart data
            return;
        }

        if (!chartRendered) {
            // if the chart isn't rendered yet, render it!
            for (var month in urlDates[currentYear]) {
                if (month === "count") { continue; }
                chartLabel.push(month);
                chartData.push(urlDates[currentYear][month].count);
            }

            chart = generateBarGraph(chartLabel, chartData, "yearChart", function () {
                chartRendered = true;
            });
        }
        else {
            // if the chart is rendered then we only need to update the data
            upsertBarGraph(chartLabel, urlDates[currentYear], chart);
        }
    });
});