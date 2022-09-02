import { ListItem, styled } from "@mui/material";

export const SpacedListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  marginBottom: 0.5,
  paddingY: 0,
  paddingX: 2,
}));
