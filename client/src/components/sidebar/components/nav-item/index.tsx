import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEventStore } from "../../../../stores/event-store";
import { SpacedListItem } from "./styles";

export interface NavItemProps {
  link: string;
  title: string;
  icon: React.ReactElement;
  isPublic: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ link, title, icon, isPublic }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = useEventStore();
  const active = link ? location.pathname === link : false;

  const handleNavigate = () => {
    if (event.id != 0 || isPublic) navigate(link);
  };

  return (
    <SpacedListItem disableGutters>
      <Button
        component="a"
        startIcon={icon}
        onClick={handleNavigate}
        disableRipple
        sx={{
          backgroundColor: active && "rgba(255,255,255, 0.08)",
          borderRadius: 1,
          color: active ? "secondary.main" : "neutral.300",
          fontWeight: active && "fontWeightBold",
          justifyContent: "flex-start",
          px: 3,
          textAlign: "left",
          textTransform: "none",
          width: "95%",
          "& .MuiButton-startIcon": {
            color: active ? "secondary.main" : "neutral.400",
          },
          "&:hover": {
            backgroundColor: "rgba(255,255,255, 0.08)",
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
      </Button>
    </SpacedListItem>
  );
};

export default NavItem;
