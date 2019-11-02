var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                
                data: {
                    labels: [
      ['The procedures are','clear and easy'],
      ['The procedures','are not clear'],
      ['The procedures','are long'],
],

                  

                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            '#D4AF37',
                            '#DB0F32',
                            '#091B27' 
                        ],
                        borderColor: [
                            '#D4AF37',
                            '#DB0F32',
                            '#091B27' 
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    legend: {
                        display:false
                        }  ,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true,
                                fontColor: '#999',
                                steppedLine:true

                            },
                        }],
                    xAxes: [{
                        barPercentage: 0.4,
                            ticks: {
                                fontColor: '#999',
                                steppedLine:true
                            },
                        }]
                    } 

                }
            });