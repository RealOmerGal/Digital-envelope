import { Paper, styled } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "70vw",
  minHeight: "70vh",
  display: "grid",
  placeItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "90vw",
  },
}));

export const StyledBox = styled("div")(({ theme }) => ({
  paddingTop: 5,
  paddingLeft: 1,
  flexGrow: 1,
}));
