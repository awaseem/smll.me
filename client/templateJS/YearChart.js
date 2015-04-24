/**
 * Created by ali on 4/13/15.
 */

var chartLabel = [];
var chartData = [];
var chart;

Template.yearChart.helpers({
    test: function () {
        urlData = Urls.findOne({ urlKey: "Eym2M8p-"});
        return Urls.find({}, {
            data: function () {
                Session.set("test", this.params);
            }
        });
    }
});

Template.yearChart.onRendered(function () {
    urlDates = Urls.findOne( {urlKey: "Eym2M8p-"}).dates;
    for (month in urlDates[moment().year()]) {
        if (month === "count") { continue; }
        chartLabel.push(moment(month, "MM").format("MMMM"));
        chartData.push(urlDates[moment().year()][month].count);
    }
    var data = {
        labels: chartLabel,
        datasets: [{
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: chartData
        }]
    };
    var ctx = $("#myChart").get(0).getContext("2d");
    chart = new Chart(ctx).Bar(data);
    Session.set("chartRendered", true);

    this.autorun(function () {
        if (Session.get("chartRendered")) {
            urlDates = Urls.findOne( {urlKey: "Eym2M8p-"}).dates;
            for (month in urlDates[moment().year()]) {
                if (month === "count") { continue; }
                var dateIndex = chartLabel.indexOf(moment(month, "MM").format("MMMM"));
                if (dateIndex > -1) {
                    chart.datasets[0].bars[dateIndex].value = urlDates[moment().year()][month].count;
                }
                else {
                    // This function will actually update chartLabel, so you don't have too
                    chart.addData([urlDates[moment().year()][month].count], moment(month, "MM").format("MMMM"));
                }
            }
            chart.update();
        }
    })
});