var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { CanvasRenderService } = require("chartjs-node-canvas");
const getStdin = require("get-stdin");
const fs = require("fs");
const readline = require("readline");
module.exports = function render(input) {
    const width = 400;
    const height = 400;
    let configuration = {
        type: "bar",
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
                {
                    label: "# of Votes",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255,99,132,1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
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
    };
    let pluginsConfig = {};
    const chartCallback = ChartJS => {
        // Global config example: https://www.chartjs.org/docs/latest/configuration/
        ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
        // Global plugin example: https://www.chartjs.org/docs/latest/developers/plugins.html
        ChartJS.plugins.register(pluginsConfig);
        // New chart type example: https://www.chartjs.org/docs/latest/developers/charts.html
        ChartJS.controllers.MyType = ChartJS.DatasetController.extend({
        // chart implementation
        });
    };
    function dataURLtoFile(dataurl, outputPath, fileName) {
        try {
            fs.mkdirSync(outputPath, { recursive: true });
        }
        catch (e) {
            console.log("cannot create folder : ", e);
        }
        const base64Data = dataurl.replace(/^data:image\/png;base64,/, "");
        console.log("output path : ", outputPath);
        fs.writeFile(outputPath + fileName, base64Data, "base64", err => {
            if (err)
                throw err;
        });
    }
    function renderGraph() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const randId = Math.random()
                    .toString(36)
                    .substring(5);
                input.chart.data.data.datasets.forEach(element => {
                    if (element.type === "line") {
                        element.fill = false;
                    }
                });
                configuration = input.chart.data;
                pluginsConfig = input.chart.data.options.plugins;
                const canvasRenderService = new CanvasRenderService(width, height, chartCallback);
                const dataUrl = yield canvasRenderService.renderToDataURL(configuration);
                const filename = `graph-${randId}.png`;
                const outputPath = `${input.outputPath}/hsbcreports/`;
                dataURLtoFile(dataUrl, outputPath, filename);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    renderGraph();
};
