import { styled, Typography, Button, Box } from "@mui/material";

export const InnerContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  display: "flex",
  alignSelf: "flex-start",
  padding: "30vh 0 0 30vh",
  flexDirection: "column",
  justifyContent: "space-evenly",
}));

export const Header = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  fontSize: "4.5rem",
}));

export const SpacedButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  fontSize: "0.9rem",
}));

export const Scrollable = styled(Box)(({ theme }) => ({
  maxHeight: "100vh",
  overflowY: "scroll",
  overflowX: "hidden",
  background: "#FFF",
  width: "40%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    maxHeight: "unset",
    overflowY: "unset",
    width: "100%",
  },
}));

export const Layout = styled(Box)(({ theme }) => ({
  width: "100vw",
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));
