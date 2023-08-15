import { ExpandMore } from "@mui/icons-material";
import { Card, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  imgSrc: string;
  timeFrame:string;
  stat:string
};

const StatCard = ({ imgSrc,timeFrame,stat }: Props) => {
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
              4,763
            </Typography>
            <Stack direction="row" spacing={0}>
              <ExpandMore color="error"  />
              <Typography color="error" variant="body2">
                12%
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default StatCard;
