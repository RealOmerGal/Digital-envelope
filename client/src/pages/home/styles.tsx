import { styled, Typography, Button, Box } from "@mui/material";

export const Header = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  textAlign: "center",
  fontSize: "4.5rem",
}));

export const Layout = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100vw",
}));

export const SpacedButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  fontSize: "0.9rem",
}));
