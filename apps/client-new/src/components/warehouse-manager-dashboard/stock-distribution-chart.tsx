import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chart } from "../chart";
import { Product } from "../../../types/product";

type Props = {
  stockItems?: {
    quantity: number;
    product: Product;
  }[];
  total?: number;
};

export const StockDistribution = ({ stockItems, total }: Props) => {
  console.log(stockItems)
  const chartSeries = stockItems?.map((stockItem) => {
    return stockItem.quantity;
  });
  const labels = stockItems?.map((stockItem) => {
    return stockItem.product.name;
  });
  const totalQuantity = stockItems?.reduce(
    (acc, stockItem) => acc + stockItem.quantity,
    0
  );
  console.log(labels, chartSeries, totalQuantity)
  if (total! - totalQuantity! > 0) {
    chartSeries?.push(total! - totalQuantity!);
    labels?.push("Others");
  }

  const useChartOptions = () => {
    const theme = useTheme();

    return {
      chart: {
        background: "transparent",
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      colors: [
        "#3B5C70",
        "#3F703B",
        "#623B70",
        "#C8309D",
        "#C88B30",
        "#C83030",
      ],
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
        type: "solid",
      },
      labels,
      legend: {
        show: false,
      },
      stroke: {
        colors: [theme.palette.background.paper],
        width: 1,
      },
      theme: {
        mode: theme.palette.mode,
      },
      tooltip: {
        fillSeriesColor: false,
      },
    };
  };

  const chartOptions = useChartOptions();

  return (
    <Card>
      <CardHeader title="Stock Distribution" />
      <CardContent>
        <Chart
          height={260}
          options={chartOptions}
          series={chartSeries}
          type="pie"
        />
        {chartSeries?.map((item, index) => {
          const amount = item;

          return (
            <Box
              key={index}
              sx={{
                alignItems: "center",
                display: "flex",
                p: 1,
              }}
            >
              <Box
                sx={{
                  backgroundColor: chartOptions.colors[index],
                  borderRadius: "50%",
                  height: 8,
                  width: 8,
                }}
              />
              <Typography sx={{ ml: 2 }} variant="subtitle2">
                {labels![index]}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography color="text.secondary" variant="subtitle2">
                {amount}
              </Typography>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};
