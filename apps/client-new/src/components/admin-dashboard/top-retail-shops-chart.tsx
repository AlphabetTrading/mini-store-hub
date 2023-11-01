import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chart } from "../chart";
import {
  GET_ADMIN_DASHBOARD_RETAIL_SHOPS_BY_TOTAL_SALES,
  TopSellingRetailShopBySalesData,
  TopSellingRetailShopVars,
} from "@/graphql/admin/queries";
import { gql, useQuery } from "@apollo/client";
import StateHandler from "../state-handler";

type Props = {};

export const TopRetailShops = (props: Props) => {
  const targetDate = new Date();
  let endDate = new Date(targetDate);
  endDate.setHours(23, 59, 59, 999);
  const { data, loading, error } = useQuery<
    TopSellingRetailShopBySalesData,
    TopSellingRetailShopVars
  >(GET_ADMIN_DASHBOARD_RETAIL_SHOPS_BY_TOTAL_SALES, {
    variables: {
      endDate: endDate.toISOString(),
      paginationInput: {
        skip: 0,
        take: 5,
      },
      startDate: "2023-09-01T00:00:00.393Z",
    },
  });

  var top_five = 0;
  data?.retailShopSortByTotalSales.items.forEach((item) => {
    top_five += item.totalSales;
  });

  const chartSeries = data
    ? data.retailShopSortByTotalSales.items
        .map((retailShop: any) => {
          return Number(retailShop.totalSales.toFixed(2));
        })
        .concat(data.totalSalesByDate - top_five)
    : [];

  const labels = data
    ? data.retailShopSortByTotalSales.items
        .map((retailShop: any) => {
          return retailShop.name;
        })
        .concat("Others")
    : [];

  const colors = [
    "#2085EC",
    "#72B4EB",
    "#0A417A",
    "#8464A0",
    "#CEA9BC",
    "#323232",
  ];

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
      colors,
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
      <CardHeader title="Top Selling Retail Shops" />
      <StateHandler
        loading={loading}
        error={error}
        empty={data?.retailShopSortByTotalSales.items?.length == 0}
      >
        {data && (
          <CardContent>
            <Chart
              height={200}
              options={chartOptions}
              series={chartSeries}
              type="pie"
            />
            {chartSeries.map((item: any, index: number) => {
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
                    {labels[index]}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Typography color="text.secondary" variant="subtitle2">
                    {((item / data.totalSalesByDate) * 100).toFixed(1)}
                  </Typography>
                </Box>
              );
            })}
          </CardContent>
        )}
      </StateHandler>
    </Card>
    // </Box>
  );
};
