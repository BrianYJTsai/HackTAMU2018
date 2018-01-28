//chrome.browserAction.onClicked.addListener(function(tab) { alert('icon clicked')});
/*chrome.tabs.create({'url': chrome.extension.getURL('popup.html')}, function(tab) {

});*/
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({ 'url': chrome.extension.getURL('index.html')}, function(tab) {
    });
});

var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');

Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 18;
var theHelp = Chart.helpers;

var ratio = localStorage.getItem("ratio").split(" ");
var message = localStorage.getItem("message", message);
var incorrectWords = localStorage.getItem("incorrectWords").split(",");
var correctWords = localStorage.getItem("correctWords").split(",");
//alert(message);
document.getElementById('transcribe').innerText = "Lorem Ipsum is simply dummy text of the printing and " +
    "typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, " +
    "when an unknown printer took a galley of type and scrambled it to make a type specimen book."
var data = {
    labels: ["Perfect! ", "Needs Work"],
    datasets: [{
        fill: true,
        backgroundColor: [
            'rgba(230, 191, 163, 1)',
            'rgba(124, 34, 43, 1)'
        ],
        data: [45, 55],
        borderColor: ['white', 'white'],
        borderWidth: [2, 2]
    }]
};

var options = {
    title: {
        display: true,
        text: 'YOUR STATS',
        position: 'top',
        horizontalAlign: "left",
    },
    rotation: -0.7 * Math.PI,
    legend: {
        display: true,

        // generateLabels changes from chart to chart,  check the source,
        // this one is from the doughut :
        // https://github.com/chartjs/Chart.js/blob/master/src/controllers/controller.doughnut.js#L42
        labels: {
            generateLabels: function(chart) {
                var data = chart.data;
                if (data.labels.length && data.datasets.length) {
                    return data.labels.map(function(label, i) {
                        var meta = chart.getDatasetMeta(0);
                        var ds = data.datasets[0];
                        var arc = meta.data[i];
                        var custom = arc && arc.custom || {};
                        var getValueAtIndexOrDefault = theHelp.getValueAtIndexOrDefault;
                        var arcOpts = chart.options.elements.arc;
                        var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                        var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                        var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);



                        return {
                            // And finally :
                            text: ds.data[i] + "% " + label,
                            fillStyle: fill,
                            strokeStyle: stroke,
                            lineWidth: bw,
                            hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                            index: i
                        };
                    });
                }
                return [];
            }
        }
    }

};

// Chart declaration:
var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
});
console.log(myPieChart.generateLegend());



//Plugin from githubExample:
//https://github.com/chartjs/Chart.js/blob/master/samples/data_labelling.html


Chart.plugins.register({
    afterDatasetsDraw: function(chartInstance, easing) {
        // To only draw at the end of animation, check for easing === 1
        var ctx = chartInstance.chart.ctx;
        chartInstance.data.datasets.forEach(function(dataset, i) {
            var meta = chartInstance.getDatasetMeta(i);
            if (!meta.hidden) {
                meta.data.forEach(function(element, index) {
                    // Draw the text in black, with the specified font
                    ctx.fillStyle = 'grey';
                    var fontSize = 16;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    // Just naively convert to string for now
                    var dataString = dataset.data[index].toString();
                    // Make sure alignment settings are correct
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'left';
                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString + '%', position.x, position.y - (fontSize / 2) - padding);
                });
            }
        });
    }
});
