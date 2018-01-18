/*****************************************************************************/
/* Performance: Event Handlers */
/*****************************************************************************/
Template.Performance.events({});
/*****************************************************************************/
/* Performance: Helpers */
/*****************************************************************************/
Template.Performance.helpers({});
/*****************************************************************************/
/* Performance: Lifecycle Hooks */
/*****************************************************************************/
Template.Performance.onCreated(function() {});
Template.Performance.onRendered(function() {
    google.charts.load('current', {
        'packages': ['line']
    });
    google.charts.setOnLoadCallback(drawChartBandwidth);
    google.charts.setOnLoadCallback(drawChartCPU);
    google.charts.setOnLoadCallback(drawChartMemory);
    google.charts.setOnLoadCallback(drawChartDisk);

    function drawChartBandwidth() {
        var dataBandwidth = new google.visualization.DataTable();
        dataBandwidth.addColumn('number', 'Day');
        dataBandwidth.addColumn('number', 'Bandwidth');
        dataBandwidth.addRows([
            [1, 14.8],
            [2, 11.9],
            [3, 25.4],
            [4, 11.7],
            [5, 11.9],
            [6, 8.8],
            [7, 3.9],
            [8, 12.3],
            [9, 3.1],
            [10, 67]
        ]);
        var options = {
            width: 500,
            height: 250,
            axes: {
                x: {
                    0: {
                        side: 'top'
                    }
                }
            },
            series: {
                0: {
                    color: 'red'
                }
            }
        };
        var chart = new google.charts.Line(document.getElementById('ChartBandwidth'));
        chart.draw(dataBandwidth, options);
    }

    function drawChartCPU() {
        var dataCPU = new google.visualization.DataTable();
        dataCPU.addColumn('number', 'Day');
        dataCPU.addColumn('number', 'utilization');
        dataCPU.addRows([
            [1, 37.8],
            [2, 57],
            [3, 25.4],
            [4, 11.7],
            [5, 11.9],
            [6, 8.8],
            [7, 76.4],
            [8, 12.3],
            [9, 3.1],
            [10, 1.6]
        ]);
        var options = {
            width: 500,
            height: 250,
            axes: {
                x: {
                    0: {
                        side: 'top'
                    }
                }
            }
        };
        var chart = new google.charts.Line(document.getElementById('ChartCPU'));
        chart.draw(dataCPU, options);
    }

    function drawChartMemory() {
        var dataMemory = new google.visualization.DataTable();
        dataMemory.addColumn('number', 'Day');
        dataMemory.addColumn('number', 'In user');
        dataMemory.addRows([
            [1, 69],
            [2, 69],
            [3, 69],
            [4, 69],
            [5, 69],
            [6, 69],
            [7, 69],
            [8, 69],
            [9, 69],
            [10, 69],
            [11, 69],
            [12, 70],
            [13, 69],
            [14, 70],
            [15, 69],
            [16, 70],
            [17, 69],
            [18, 69],
            [19, 69],
            [20, 70],
            [21, 70],
            [22, 70],
            [23, 70],
            [24, 70]
        ]);
        var options = {
            width: 500,
            height: 250,
            axes: {
                x: {
                    0: {
                        side: 'top'
                    }
                }
            },
            series: {
                0: {
                    color: '#7E57A4'
                }
            }
        };
        var chart = new google.charts.Line(document.getElementById('ChartMemory'));
        chart.draw(dataMemory, options);
    }

    function drawChartDisk() {
        var dataDisk = new google.visualization.DataTable();
        dataDisk.addColumn('number', 'Day');
        dataDisk.addColumn('number', 'Active time');
        dataDisk.addRows([
            [1, 76.4],
            [2, 20.5],
            [3, 21],
            [4, 20],
            [5, 11.9],
            [6, 8.8],
            [7, 20],
            [8, 12.3],
            [9, 3.1],
            [10, 1.6]
        ]);
        var options = {
            width: 500,
            height: 250,
            axes: {
                x: {
                    0: {
                        side: 'top'
                    }
                }
            },
            series: {
                0: {
                    color: '#82CC00'
                }
            }
        };
        var chart = new google.charts.Line(document.getElementById('ChartDisk'));
        chart.draw(dataDisk, options);
    }
});
Template.Performance.onDestroyed(function() {});