import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const StackedAreaChart = ({ data }) => {
  const options = {
    chart: {
      type: "area",
      height: 220,
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      tickmarkPlacement: "on",
      title: { enabled: false },
      gridLineColor: "#E0E0E0",
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      title: {
        useHTML: false,
      },
      labels: {
        enabled: false,
      },
    },
    tooltip: {
      shared: true,
      valueSuffix: " units",
    },
    plotOptions: {
      area: {
        stacking: "normal",
        lineColor: "#666666",
        lineWidth: 1,
      },
    },
    series: [
      {
        name: "Last Month",
        data: data?.lastMonth || [],
        marker: {
          enabled: true,
          fillColor: "#07E098",
        },
        color: "#00E09653",
      },
      {
        name: "This Month",
        data: data?.thisMonth || [],
        color: "#009DFF51",
        marker: {
          enabled: true,
          fillColor: "#0095FF",
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StackedAreaChart;
