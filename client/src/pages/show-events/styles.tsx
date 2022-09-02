import { Grid, GridProps, Paper, styled } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "90vw",
  minHeight: "60vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    width: "70vw",
  },
}));

export const StyledGrid = styled((props: GridProps) => (
  <Grid item lg={6} sm={6} xl={4} xs={12} {...props} />
))(({ theme }) => ({}));
