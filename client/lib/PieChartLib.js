/**
 * Created by awaseem on 15-04-25.
 */

var chartOptions = {
    segmentShowStroke : false,
    responsive: true,
    percentageInnerCutout: 55,
    legendTemplate: "<ul class=\"pie-legend\"><% for (var i=0; i<segments.length; i++){%><%if(segments[i].label && segments[i].value && segments[i].value != 0){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%=segments[i].label%>: <%=segments[i].value%><%}%></li><%}%></ul>"
};

generatePieGraph = function (chartLabel, chartData, chartId, callback) {
    // generate a bar graph based on the labels and data
    // returns an instance of a chart object
    var data = [];

    for (var index in chartLabel) {
        data.push({
            value: chartData[index],
            color: randomColor({
                luminosity: 'light'
            }),
            highlight:"rgba(220,220,220,0.75)",
            label: chartLabel[index]
        });
    }

    var ctx = $("#" + chartId).get(0).getContext("2d");
    var chart = new Chart(ctx).Doughnut(data,chartOptions);
    // callback function to call right after the chart has rendered
    if (typeof callback === "function") {
        callback();
    }
    return chart;
};

upsertPieGraph = function (chartLabel, urlObj, chartObj) {
    // update or insert new data into the bar graph
    // re-render the chart after the update is complete
    for (var urlData in urlObj) {
        var index = chartLabel.indexOf(urlData);
        if (index > -1) {
            chartObj.segments[index].value = urlObj[urlData]
        }
        else {
            chartLabel.push(urlData);
            chartObj.addData({
                value: urlObj[urlData],
                color: randomColor({
                    luminosity: 'light'
                }),
                highlight: "rgba(220,220,220,0.75)",
                label: urlData
            });
        }
    }
    chartObj.update();
};

upsertRefererPieGraph = function (chartLabel, urlObj, chartObj) {
    for (var urlData in urlObj) {
        var index = chartLabel.indexOf(urlData.replace(/:/g, "."));
        if (index > -1) {
            chartObj.segments[index].value = urlObj[urlData];
        }
        else {
            chartLabel.push(urlData.replace(/:/g, "."));
            chartObj.addData({
                value: urlObj[urlData],
                color: randomColor({
                    luminosity: 'light'
                }),
                highlight: "rgba(220,220,220,0.75)",
                label: urlData.replace(/:/g, ".")
            });
        }
    }
    chartObj.update();
};