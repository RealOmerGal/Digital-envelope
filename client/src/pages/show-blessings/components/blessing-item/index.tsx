import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { Blessing } from "../../../../types/blessing";

const BlessingItem = ({
  createdBy,
  text,
  createdAt,
  paymentAmount,
}: Blessing) => {
  const date = new Date(createdAt).toLocaleDateString();
  return (
    <Card sx={{ mt: 5 }}>
      <CardHeader title={createdBy} subheader={date} sx={{ my: -1 }} />
      <Divider />
      <CardContent>
        <Typography variant="body2">{text}</Typography>
        <Typography textAlign="right" color="success">
          {paymentAmount}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlessingItem;
