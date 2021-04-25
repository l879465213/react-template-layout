import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

import {
  chartBackgroundColor,
  chartBackgroundBorderColor,
} from "../../libs/colors";
import { formatNum } from "../../services/utils";

const DoughnutChart = ({ allMemberData, type, query }) => {
  const labels = type[0].data ? type[0].data.map((x) => x.label) : [];
  let data2 = [];
  if (type[0].data.length > 0) {
    for (let i = 0; i < type[0].data.length; i++) {
      if (i === 0) {
        data2.push([allMemberData.korea]);
      } else {
        data2.push([allMemberData.others]);
      }
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: data2,
        backgroundColor: chartBackgroundColor,
        borderColor: chartBackgroundBorderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        labels: {
          index: {
            formatter: (value, ctx) => {
              return (
                formatNum(value) +
                " / " +
                ((value / allMemberData.total) * 100).toFixed(2) +
                "%"
              );
            },
            anchor: "end",
            align: "end",
            color: "#000000",
            font: {
              weight: "bold",
              size: 15,
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
      padding: 30,
    },
    tooltips: {
      titleFontSize: 12,
      bodyFontSize: 12,
    },
    cutoutPercentage: 80, //도넛 너비
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

    scaleShowLabels: false,
  };
  return (
    <React.Fragment>
      <Doughnut data={data} options={options} />
    </React.Fragment>
  );
};

export default DoughnutChart;
