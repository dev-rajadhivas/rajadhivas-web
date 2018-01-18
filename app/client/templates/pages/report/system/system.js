/*****************************************************************************/
/* System: Event Handlers */
/*****************************************************************************/
Template.System.events({});
/*****************************************************************************/
/* System: Helpers */
/*****************************************************************************/
Template.System.helpers({});
/*****************************************************************************/
/* System: Lifecycle Hooks */
/*****************************************************************************/
Template.System.onCreated(function() {});
Template.System.onRendered(function() {
    google.charts.load('current', {
        packages: ['corechart', 'bar']
    });
    google.charts.setOnLoadCallback(drawChartAll);
    google.charts.setOnLoadCallback(drawTitleSubtitle);
    google.charts.setOnLoadCallback(drawChartDevice);
    google.charts.setOnLoadCallback(drawChartService);

    function drawChartAll() {
        var dataAll = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Up', 79.8],
            ['Down', 20.2]
        ]);
        var options = {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            slices: {
                1: {
                    color: 'red'
                }
            },
            legend: {
                position: 'bottom',
            },
            chartArea: {
                left: 20,
                top: 20,
                width: '50%',
                height: '75%'
            }
        };
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(dataAll, options);
    }

    function drawTitleSubtitle() {
        var dataBar = google.visualization.arrayToDataTable([
            ['2016', 'Up', 'Down'],
            ['Jan', 95, 5],
            ['Feb', 93, 7],
            ['Mar', 85, 15],
            ['Arp', 90, 10],
            ['May', 88.8, 11.2],
            ['Jun', 98.5, 1.5],
            ['Jul', 77.8, 22.2],
            ['Aug', 98.5, 1.5],
            ['Sep', 89.9, 10.1],
            ['Oct', 99.9, 0.1],
            ['Nov', 90.5, 9.5],
            ['Dec', 81, 19]
        ]);
        var options = {
            hAxis: {
                title: 'Total Population',
                minValue: 0,
            },
            legend: {
                position: 'none'
            },
        };
        var material = new google.charts.Bar(document.getElementById('bar_all'));
        material.draw(dataBar, options);
    }

    function drawChartDevice() {
        var dataDevice = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Up', 79.8],
            ['Down', 20.2]
        ]);
        var options = {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            slices: {
            	0: {
                    color: 'green'
                },
                1: {
                    color: 'red'
                }
            },
            legend: {
                position: 'bottom',
            },
            pieHole: 0.4
        };
        var chart = new google.visualization.PieChart(document.getElementById('pieDevice'));
        chart.draw(dataDevice, options);
    }

    function drawChartService() {
        var dataService = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Up', 79.8],
            ['Down', 20.2]
        ]);
        var options = {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            slices: {
            	0: {
                    color: '#2C8182'
                },
                1: {
                    color: 'red'
                }
            },
            legend: {
                position: 'bottom',
            },
            pieHole: 0.4
        };
        var chart = new google.visualization.PieChart(document.getElementById('pieService'));
        chart.draw(dataService, options);
    }
});
Template.System.onDestroyed(function() {});