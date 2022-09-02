import { Avatar, AvatarProps, Card, styled } from "@mui/material";

export const DashboardItemCard = styled(Card)(({ theme }) => ({
  height: "100%",
}));

export const DashboardItemIcon = styled(Avatar)((props) => ({
  height: 56,
  width: 56,
  backgroundColor: props.color,
}));
