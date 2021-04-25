import React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import {
  chartBackgroundColor,
  chartBackgroundBorderColor,
} from "../../libs/colors";

const BarChart = ({ memberData, type, query, data1 = 0, data2 = 0 }) => {
 
  let datasets = [];
  if (type[0].data.length > 0) {
    for (let i = 0; i < type[0].data.length; i++) {
      datasets.push({
        type: "bar",
        label: type[0].data[i].label,
        // data: [type[0].data[i].value],
        data: [i === 0 ? data1 : data2],
        backgroundColor: chartBackgroundColor[i],
        borderColor: chartBackgroundBorderColor[i],
        borderWidth: 1,
        pointRadius: 0, //데이터 포인터크기
        stack: i + 1,
        barPercentage: 0.6,
      });
    }
  }

  const data = {
    labels: [""],
    datasets: datasets,
  };

  const options = {
    plugins: {
      datalabels: {
        labels: {
          index: {
            formatter: (value, ctx) => {
              return (
                value +
                " / " +
                ((value / (data1 + data2)) * 100).toFixed(2) +
                "%"
              );
            },
            anchor: "end",
            align: "end",
            color: "#000000",
            font: {
              weight: "bold",
              size: 10,
            },
            offset: 4,
          },
          value: {
            formatter: function (value, ctx) {
              return null;
            },
          },
          name: {
            formatter: (value, ctx) => {
              return null;
            },
          },
        },
      },
    },
    layout: {
      padding: 20,
    },
    tooltips: {
      titleFontSize: 12,
      bodyFontSize: 12,
    },
    // devicePixelRatio: window.devicePixelRatio * 3, //화질비율조정
    maintainAspectRatio: false,
    // responsiveAnimationDuration: 0,
    animation: {
      duration: 1000,
    },
    responsive: true,
    legend: {
      display: true,
      position: "bottom",
      labels: {
        padding: 40, //default is 10
        boxWidth: 10,
      },
    },
    scales: {
      xAxes: [
        {
          display: false,
          // barPercentage: 0.8 // bar chart: "scales.[x/y]Axes.barPercentage" is deprecated. Please use "dataset.barPercentage" instead
        },
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            color: "transparent",
            display: true,
            drawBorder: false,
            zeroLineColor: "#ccc",
            zeroLineWidth: 1,
          },
          scaleLabel: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
  };

  return (
    <React.Fragment>
      <Bar data={data} options={options} />
    </React.Fragment>
  );
};

export default BarChart;
