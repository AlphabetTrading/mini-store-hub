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
import { randomInt } from "crypto";
import { getRandomColor } from "@/helpers/getRandomColor";
import {
  GET_ADMIN_DASHBOARD_RETAIL_SHOPS_BY_TOTAL_SALES,
  TopSellingRetailShopBySalesData,
  TopSellingRetailShopVars,
} from "@/graphql/admin/queries";
import { gql, useQuery } from "@apollo/client";

type Props = {};

export const TopRetailShops = (props: Props) => {
  const { data, loading, error } = useQuery<
    TopSellingRetailShopBySalesData,
    TopSellingRetailShopVars
  >(GET_ADMIN_DASHBOARD_RETAIL_SHOPS_BY_TOTAL_SALES, {
    variables: {
      endDate: new Date().toUTCString(),
      startDate: "2023-09-01T00:00:00.393Z",
      paginationInput: {
        skip: 0,
        take: 5,
      },
    },
  });

  const {
    data: totalSalesData,
    loading: totalSalesLoading,
    error: totalSalesError,
  } = useQuery(
    gql`
      query Query($endDate: String!, $startDate: String!) {
        totalSalesByDate(endDate: $endDate, startDate: $startDate)
      }
    `,
    {
      variables: {
        endDate: new Date().toUTCString(),
        startDate: "2023-09-01T00:00:00.393Z",
      },
    }
  );

  var top_five = 0;
  data?.retailShopSortByTotalSales.items.forEach((item) => {
    top_five += item.totalSales;
  });
  var total = totalSalesData?.totalSalesByDate;

  const chartSeries = data
    ? data.retailShopSortByTotalSales.items
        .map((retailShop: any) => {
          return Number(retailShop.totalSales.toFixed(2));
        })
        .concat(total - top_five)
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
      <CardHeader title="Top Selling Retail Shop" />
      {loading || totalSalesLoading ? (
        <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </Stack>
      ) : (
        data &&
        totalSalesData &&
        data.retailShopSortByTotalSales.items?.length > 0 && (
          <CardContent>
            <Chart
              height={200}
              options={chartOptions}
              series={chartSeries}
              type="pie"
            />
            {chartSeries.map((item: any, index: number) => {
              //   const amount = numeral(item).format('$0,0.00');
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
                    {((item / totalSalesData.totalSalesByDate) * 100).toFixed(
                      1
                    )}
                  </Typography>
                </Box>
              );
            })}
          </CardContent>
        )
      )}
    </Card>
    // </Box>
  );
};
