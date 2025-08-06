import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const WeeklyColumnChart = ({ data }) => {
  const maxY = Math.max(...data.map((point) => point.y));

  const options = {
    chart: {
      type: "column",
      height: 220,
    },
    title: {
      text: null,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: null,
      },
      max: maxY,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
        },
        pointWidth: 28,
      },
    },
    tooltip: {
      headerFormat: "<span style='font-size:11px'>{series.name}</span><br>",
      pointFormat:
        "<span style='color:{point.color}'>{point.name}</span>: <b>{point.y}</b><br/>",
    },
    series: [
      {
        name: "Days",
        colorByPoint: true,
        data: data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default WeeklyColumnChart;
