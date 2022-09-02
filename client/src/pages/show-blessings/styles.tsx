import { Stack, StackProps, styled } from "@mui/material";

export const BlessingContainer = styled((props: StackProps) => (
  <Stack
    direction="column"
    spacing={4}
    sx={{ flexGrow: 1, mr: { lg: 5, md: 3, sm: 1 } }}
    {...props}
  />
))(({ theme }) => ({}));
