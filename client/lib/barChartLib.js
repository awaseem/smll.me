/**
 * Created by awaseem on 15-04-24.
 */
generateBarGraph = function (chartLabels, chartData, chartId, callback) {
    // generate a bar graph based on the labels and data
    // returns an instance of a chart object
    var data = {
        labels: chartLabels,
        datasets: [{
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: chartData
        }]
    };
    var ctx = $("#" + chartId).get(0).getContext("2d");
    var chart = new Chart(ctx).Bar(data);
    // callback function to call right after the chart has rendered
    if (typeof callback === "function") {
        callback();
    }
    return chart;
};

upsertBarGraph = function (chartLabel, urlDateObj, chartObj) {
    // update or insert new data into the bar graph
    // re-render the chart after the update is complete
    for (value in urlDateObj) {
        if (value === "count") { continue; }
        var index = chartLabel.indexOf(value);
        if (index > -1) {
            chartObj.datasets[0].bars[index].value = urlDateObj[value].count;
        }
        else {
            chartObj.addData([urlDateObj[value].count], value);
        }
    }
    chartObj.update();
};