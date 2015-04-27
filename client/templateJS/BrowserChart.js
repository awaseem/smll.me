/**
 * Created by awaseem on 15-04-25.
 */

Template.browserChart.helpers({
    // put any helpers here
});

Template.browserChart.onRendered(function () {
    var chartLabel = [];
    var chartData = [];
    var chart;
    var chartRendered = false;

    this.autorun(function () {
        var urlKey = Session.get("urlKey");
        var browsers = Urls.findOne({ urlKey: urlKey}).browsers;

        if (isObjEqual(browsers, { Unknown: 0})) {
            return;
        }

        if (!chartRendered) {
            for (var browser in browsers) {
                chartLabel.push(browser);
                chartData.push(browsers[browser]);
            }
            chart = generatePieGraph(chartLabel, chartData, "browserChart", function () {
                chartRendered = true;
            });
        } else {
            upsertPieGraph(chartLabel, browsers, chart);
        }
        $("#browser_legend").html(chart.generateLegend());
    });

});