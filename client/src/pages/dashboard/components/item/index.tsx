import { CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { DashboardItemCard, DashboardItemIcon } from "./styles";

interface DashboardItemProps {
  title: string;
  iconColor: string;
  mainStat: React.ReactNode;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardItemProps> = ({
  children,
  title,
  iconColor,
  icon,
  mainStat,
}) => {
  return (
    <DashboardItemCard>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
              textTransform={"uppercase"}
            >
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {mainStat}
            </Typography>
          </Grid>
          <Grid item>
            <DashboardItemIcon color={iconColor}>{icon}</DashboardItemIcon>
          </Grid>
        </Grid>
        {children && <>{children}</>}
      </CardContent>
    </DashboardItemCard>
  );
};

export default DashboardCard;
