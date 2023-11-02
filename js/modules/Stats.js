Game.STATS = (() => {

    let chart;
    let prevBeurt;

    let p1CapturedFiches = [];
    let p2CapturedFiches = [];

    const _privateInit = () => {
        update();
    };

    const update = () => {
        let context = $('#myChart');
        // chart?.destory();
        chart = new Chart(context, {
            type: 'line',
            data: {
                labels: p1CapturedFiches.map((value, index) => index + 1),
                datasets: [
                {
                    label: "Player 1",
                    data: p1CapturedFiches,
                    fill: false,
                    borderColor: "#01A2E9",
                    tension: 0.1
                },
                {
                    label: "Player 2",
                    data: p2CapturedFiches,
                    fill: false,
                    borderColor: "#DA3D2D",
                    tension: 0.1
                }
              ]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        console.log(context);
    };

    const pushData = (fiches, beurt) => {
        let turnedFiches = fiches.length;

        if (beurt == 1 && prevBeurt != 1) {
            prevBeurt = 1;
            p1CapturedFiches.push(turnedFiches);
        } 
        
        if (beurt == 2 && prevBeurt != 2) {
            
            prevBeurt = 2;
            p2CapturedFiches.push(turnedFiches);
            
        }

        chart.data.labels = p1CapturedFiches.map((value, index) => index + 1);
        chart.data.datasets = [
            {
                label: "Player 1",
                data: p1CapturedFiches,
                fill: false,
                borderColor: "#01A2E9",
                tension: 0.1
            },
            {
                label: "Player 2",
                data: p2CapturedFiches,
                fill: false,
                borderColor: "#DA3D2D",
                tension: 0.1
            }
        ]
        chart.update();
    };

    return {
        init: _privateInit,
        push: pushData,
    }
})();