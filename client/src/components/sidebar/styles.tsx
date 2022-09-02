import { Box, BoxProps, Divider, styled } from "@mui/material";

export const SidebarPlaceholder = styled(Box)(({ theme }) => ({
  width: 380,
  height: "100%",
  marginRight: 5,
}));

export const RowBar = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

export const AccountSection = styled((props: BoxProps) => (
  <Box
    sx={{
      px: 3,
      borderRadius: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexGrow: 1,
      py: "11px",
      backgroundColor: "rgba(255,255,255,0.04)",
      cursor: "pointer",
    }}
    {...props}
  />
))(({ theme }) => ({}));

export const NavDivider = styled(Divider)(({ theme }) => ({
  borderColor: "#2D3748",
  my: 2,
}));
