/**
 * Created by awaseem on 15-04-25.
 */

var chart;

Template.osChart.helpers({
    // put any helpers here
});

Template.osChart.onRendered(function () {
    var chartLabel = [];
    var chartData = [];
    var chartRendered = false;

    this.autorun(function () {
        var urlKey = Session.get("urlKey");
        var osValues = Urls.findOne({ urlKey: urlKey }).os;

        if (isObjEqual(osValues, { Unknown: 0})) {
            return;
        }

        if (!chartRendered) {
            if (chart) { chart.destroy()}
            for (var os in osValues) {
                chartLabel.push(os);
                chartData.push(osValues[os]);
            }

            chart = generatePieGraph(chartLabel, chartData, "osChart", function () {
                chartRendered = true;
            });
        }
        else {
            upsertPieGraph(chartLabel, osValues, chart);
        }
        $("#os_legend").html(chart.generateLegend());
    });
});