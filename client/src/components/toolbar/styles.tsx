import { styled } from "@mui/material/styles";

export const ToolbarContainer = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  width: "90%",
  marginTop: 30,
  alignSelf: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));
