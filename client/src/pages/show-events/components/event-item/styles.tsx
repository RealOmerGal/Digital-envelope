import { Box, Card, styled } from "@mui/material";

export const CardContainer = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

export const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  paddingBottom: 3,
}));
