import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const WeeklyColumnChart = () => {
  const data = [
    { name: "Monday", y: 70, drilldown: "mondayDetails", color: "#0095FF" },
    { name: "Tuesday", y: 100, drilldown: "tuesdayDetails", color: "#0095FF" },
    {
      name: "Wednesday",
      y: 150,
      drilldown: "wednesdayDetails",
      color: "#0095FF",
    },
    { name: "Thursday", y: 70, drilldown: "thursdayDetails", color: "#0095FF" },
    { name: "Friday", y: 40, drilldown: "fridayDetails", color: "#0095FF" },
    { name: "Saturday", y: 70, drilldown: "saturdayDetails", color: "#0095FF" },
    { name: "Sunday", y: 30, drilldown: "sundayDetails", color: "#0095FF" },
  ];

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
