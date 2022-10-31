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

export const ButtonContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  margin: 8,
  display: "flex",
  justifyContent: "flex-end",
}));
