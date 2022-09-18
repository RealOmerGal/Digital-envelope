import {
  AddBox,
  Celebration,
  Settings,
  Leaderboard,
  List,
  Menu as MenuIcon,
  QrCode,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  Drawer,
  Menu,
  MenuItem,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { useUserStore } from "../../stores/user-store";
import NavItem, { NavItemProps } from "./components/nav-item";
import {
  AccountSection,
  NavDivider,
  RowBar,
  SidebarPlaceholder,
} from "./styles";

const links: NavItemProps[] = [
  {
    link: "/event/create",
    icon: <AddBox />,
    title: "Create Event",
    isPublic: true,
  },
  {
    link: "/dashboard",
    icon: <Leaderboard />,
    title: "Overview",
    isPublic: false,
  },
  {
    link: "/blessings",
    icon: <List />,
    title: "Blessings",
    isPublic: false,
  },
  {
    link: "/qr",
    icon: <QrCode />,
    title: "Generate Qr",
    isPublic: false,
  },
  {
    link: "/event/edit",
    icon: <Settings />,
    title: "Event Settings",
    isPublic: false,
  },
  {
    link: "/events",
    icon: <Celebration />,
    title: "My Events",
    isPublic: true,
  },
];

const SideBar = () => {
  const lgOrXL = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
    defaultMatches: true,
  });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const { clearUser, user } = useUserStore();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    await clearUser();
    navigate("/");
  };

  const items = (
    <RowBar>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5">Digital Envelope</Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <AccountSection onClick={handleMenuClick}>
          <Avatar
            alt={user.firstName + " " + user.lastName}
            src={user.photoUrl}
            sx={{ width: 32, height: 32, mr: 2 }}
          />
          <Typography variant="subtitle1">
            {user.firstName + " " + user.lastName}
          </Typography>
        </AccountSection>
      </Box>
      <Menu
        open={isMenuOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
      <NavDivider />
      <Box sx={{ flexGrow: 1 }}>
        {links.map((item) => (
          <NavItem key={item.title} {...item} />
        ))}
      </Box>
    </RowBar>
  );

  return (
    <>
      {!lgOrXL && !isOpen && (
        <Box sx={{ display: "block", position: "fixed" }}>
          <Card>
            <MenuIcon onClick={() => setIsOpen(!isOpen)} sx={{ p: 1 }} />
          </Card>
        </Box>
      )}
      {lgOrXL && <SidebarPlaceholder />}
      <Drawer
        anchor="left"
        open={lgOrXL || isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
        variant={lgOrXL ? "permanent" : "temporary"}
      >
        {items}
      </Drawer>
    </>
  );
};

export default SideBar;
