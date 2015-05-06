/**
 * Created by awaseem on 15-04-25.
 */
/**
 * Created by awaseem on 15-04-25.
 */

var chart;

Template.refererChart.helpers({
    // put any helpers here
});

Template.refererChart.onRendered(function () {
    var chartLabel = [];
    var chartData = [];
    var chartRendered = false;

    this.autorun(function () {
        var urlKey = Session.get("urlKey");
        var referers = Urls.findOne({ urlKey: urlKey }).referer;

        if (isObjEqual(referers, { Unknown: 0})) {
            return;
        }

        if (!chartRendered) {
            if (chart) { chart.destroy() }
            for (var referer in referers) {
                chartLabel.push(referer.replace(/:/g, "."));
                chartData.push(referers[referer]);
            }
            chart = generatePieGraph(chartLabel, chartData, "refChart", function () {
                chartRendered = true;
            });
        }
        else {
            upsertRefererPieGraph(chartLabel, referers, chart);
        }
        $("#ref_legend").html(chart.generateLegend());
    });
});

Template.refererChart.onDestroyed(function () {
    if (chart) { chart.destroy() }
});