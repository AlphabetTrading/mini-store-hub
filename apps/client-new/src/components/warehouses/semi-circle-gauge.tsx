import { Box, Container, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => null,
});

type Props = {
  value: number;
};

const useChartOptions = () => {
  const theme = useTheme();
  return {
    chart: {
      height: 250,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    series: [67],
    colors: ["#2970FF"],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: "60%",
        },
        track: {
          background: "#D9D9D9",
          startAngle: -90,
          endAngle: 90,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    stroke: {
      lineCap: "butt",
    },
    grid: {
      show: false,
      padding: { left: -10, right: -10, top: -30, bottom: 0 },
    },
  };
};

const SemiCircleGauge = ({ value }: Props) => {
  const chartOptions = useChartOptions();
  const chartSeries = [value];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      height={250}
      width={250}
      type="radialBar"
    />
  );
};

export default SemiCircleGauge;
