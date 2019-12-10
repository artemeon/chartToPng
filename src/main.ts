/* eslint-disable @typescript-eslint/no-var-requires */
const { CanvasRenderService } = require('./chartjs-node-canvas/dist/index')
const getStdin = require('get-stdin')
const fs = require('fs')

const width = 1020
const height = 510
let configuration = {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        callback: value => `$${value}`
                    }
                }
            ]
        }
    }
}

let pluginsConfig = {}
const chartCallback = (ChartJS): void => {
    // Global config example: https://www.chartjs.org/docs/latest/configuration/
    ChartJS.defaults.global.elements.rectangle.borderWidth = 2
    // Global plugin example: https://www.chartjs.org/docs/latest/developers/plugins.html
    ChartJS.plugins.register(pluginsConfig)
    // New chart type example: https://www.chartjs.org/docs/latest/developers/charts.html
    ChartJS.controllers.MyType = ChartJS.DatasetController.extend({
        // chart implementation
    })
}
function dataURLtoFile(dataurl, outputPath, fileName): void {
    try {
        fs.mkdirSync(outputPath, { recursive: true })
    } catch (e) {
        console.log('cannot create folder : ', e)
    }
    const base64Data = dataurl.replace(/^data:image\/png;base64,/, '')
    fs.writeFile(outputPath + fileName, base64Data, 'base64', err => { if (err) throw err })
    // fs.chmodSync(outputPath + fileName, '777');
}

(async (): Promise<void> => {
    try {
        const randId = Math.random()
            .toString(36)
            .substring(5)
        const input = JSON.parse(await getStdin())
        input.chart.data.data.datasets.forEach((element): void => {
            if (element.type === 'line') {
                element.fill = false
            }
        })
        configuration = input.chart.data
        pluginsConfig = input.chart.data.options.plugins
        const canvasRenderService = new CanvasRenderService(
            width,
            height,
            chartCallback
        )
        const dataUrl = await canvasRenderService.renderToDataURL(configuration)
        const filename = 'graph-' + randId + '.png'
        const outputPath = input.outputPath + '/hsbcreports/'
        dataURLtoFile(dataUrl, outputPath, filename)
        process.stdout.write(outputPath + filename)
    } catch (e) {
        console.log(e)
    }
})()
