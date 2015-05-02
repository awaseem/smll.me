/**
 * Created by ali on 4/13/15.
 */

var chartLabel = [];
var chartData = [];
var chart;
var currentYear = moment().year();
var currentMonth = moment().format("MMMM");
var chartRendered = false;

Template.dateChart.helpers({
    chartTitle: function () {
        if (!Session.get("toggleMonth")) {
            return "Year: " + currentYear;
        }
        return "Month: " + currentMonth;
    },
    chartButton: function () {
        if (!Session.get("toggleMonth")) {
            return "Year"
        }
        return "Month"
    }
});

Template.dateChart.onRendered(function () {
    Session.set("toggleMonth", false);

    this.autorun(function () {
        var toggleMonth = Session.get("toggleMonth");
        var urlKey = Session.get("urlKey");
        var urlDates = Urls.findOne( {urlKey: urlKey} ).dates;

        if (jQuery.isEmptyObject(urlDates)) {
            // do some view routing here to display no chart data
            return;
        }

        if (chartRendered) {
            if (toggleMonth) {
                upsertBarGraph(chartLabel, urlDates[currentYear][currentMonth], chart);
            }
            else {
                upsertBarGraph(chartLabel, urlDates[currentYear], chart);
            }
        }
        else {
            chartData = [];
            chartLabel = [];
            if (chart) { chart.destroy(); }
            if (toggleMonth) {
                var urlTimeFrame = urlDates[currentYear][currentMonth];
            }
            else {
                var urlTimeFrame = urlDates[currentYear];
            }
            for (var date in urlTimeFrame) {
                if (urlTimeFrame.hasOwnProperty(date)) {
                    if (date === "count") { continue; }
                    chartLabel.push(date);
                    chartData.push(urlTimeFrame[date].count);
                }
            }
            chart = generateBarGraph(chartLabel, chartData, "dateChart", function () {
                chartRendered = true;
            });
        }
    });
});

Template.dateChart.events({
    "click #change-chart": function () {
        var toggle = !Session.get("toggleMonth");
        chartRendered = false;
        Session.set("toggleMonth", toggle);
    }
});