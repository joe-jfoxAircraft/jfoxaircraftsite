google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = google.visualization.arrayToDataTable([
      ['Innovation field', 'Project number'],
      ['Experimental Aircraft Kit',	10],
      ['Electrical Aircraft',		5],
      ['Military UAV',  			3],
      ['Flight Simulator', 			15],
      ['Space Technology ',    		1]
    ]);

    var options = {
      title: 'Innovation Field Contribution'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}