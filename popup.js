/*
$(document).click(function() {
    alert("Hello");
});*/

$("#selectedText").on("click", function() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    }
    //alert(text);


});

document.addEventListener('DOMContentLoaded', function()
{
    var ctx = document.getElementById("chart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [ '', 'b', 'c', 'd' ],
            datasets: [{
                backgroundColor: [
                    "#59be5b",
                    "#d56328",
                    "#ff1b2d",
                    "#0078d7"
                ],
                data: [ 1, 2, 3, 4 ]
            }]
        }
    });

    document.getElementById('test').textContent = 'SUCCEED';
});