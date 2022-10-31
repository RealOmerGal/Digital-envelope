import { styled, Typography } from "@mui/material";

export const SectionImage = styled("img")(({ theme }) => ({
  width: "100%",
  objectFit: "contain",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

export const SectionHeader = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "1.5rem",
  marginBottom: theme.spacing(3),
}));
