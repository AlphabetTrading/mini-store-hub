import { ExpandMore, ExpandLess, Remove } from "@mui/icons-material";
import { Box, Card, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  imgSrc: string;
  timeFrame: string;
  stat: string;
  value?: number;
  pastValue?: number;
};

const StatCard = ({ imgSrc, timeFrame, stat, value, pastValue }: Props) => {
  const difference = (value! - pastValue!) / pastValue!;
  return (
    <Card sx={{ py: 2, pl: 2 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <div>
          <img src={imgSrc} width={35} />
        </div>
        <Stack>
          <Typography color="text.secondary" variant="body2">
            {`${timeFrame} ${stat}`}
          </Typography>
          <Stack direction="row">
            <Typography color="text.primary" variant="h5">
              {value ? value.toLocaleString() : 0}
            </Typography>
            <Stack direction="row" spacing={0} sx={{ alignItems: "center" }}>
              {difference !== 0 && pastValue !== 0 ? (
                difference > 0 ? (
                  <ExpandLess color="success" />
                ) : (
                  <ExpandMore color="error" />
                )
              ) : (
                <Stack sx={{ justifyContent: "center" }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 2,
                      backgroundColor: "gray",
                      marginX: 1,
                    }}
                  />
                </Stack>
              )}
              <Typography
                sx={{
                  color: "gray",
                }}
                variant="body2"
              >
                {pastValue !== 0 ? Math.abs(difference).toFixed() : 0}%
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default StatCard;
