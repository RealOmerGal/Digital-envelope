import { styled, Typography, Box } from "@mui/material";

export const SectionContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(10),
}));

export const SectionHeader = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "1.5rem",
}));
