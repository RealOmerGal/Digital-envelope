import { Grid, GridProps, styled } from "@mui/material";

export const StyledGridItem = styled((props: GridProps) => (
  <Grid item md={6} xs={12} {...props} />
))(({ theme }) => ({}));

export const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  padding: 15,
}));
