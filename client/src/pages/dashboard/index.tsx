import {
  Box,
  Grid,
  LinearProgress,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useEventStore } from "../../states/event-store";
import IDashboard from "../../types/dashboard";
import DashboardCard from "./components/item";
import { StatBox, StyledGrid } from "./styles";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import { ArrowDownward } from "@mui/icons-material";
import DashboardToolbar from "../../components/toolbar";
import SideBar from "../../components/sidebar";
import { UtilityService } from "../../services/util.service";
import DashboardChart from "./components/chart";
import CenteringContainer from "../../components/CenteringContainer";
import useLoading from "../../hooks/useLoading";

const Dashboard = () => {
  const [data, setData] = useState<IDashboard>();

  const getData = async () => {
    const data = await UtilityService.generateDashboard();
    setData((prev) => data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const { activateFunc: fetchData, loading } = useLoading(getData);

  const renderContent = () => {
    if (loading)
      return (
        <CenteringContainer sx={{ height: "80vh" }}>
          <CircularProgress />
        </CenteringContainer>
      );

    // If theres no blessings yet
    if (data && data?.amountDistribution.length < 1) {
      return (
        <Stack sx={{ flexGrow: 1 }}>
          <DashboardToolbar />
          <CenteringContainer sx={{ height: "80vh" }}>
            <Typography variant="h4"> No Insights yet...</Typography>
          </CenteringContainer>
        </Stack>
      );
      //The if statemnt is for typescript, if we made it here,theres data
    } else if (data)
      return (
        <Stack sx={{ flexGrow: 1 }}>
          <DashboardToolbar />
          <CenteringContainer>
            <Grid container spacing={3}>
              <StyledGrid>
                <DashboardCard
                  title="Average Per Guest"
                  iconColor="#D14343"
                  icon={<InsertChartIcon />}
                  mainStat={data!.averagePerGuest + "$"}
                >
                  <StatBox>
                    <ArrowDownward color="error" />
                    <Typography
                      color="error"
                      sx={{
                        mr: 1,
                      }}
                      variant="body2"
                    >
                      12%
                    </Typography>
                    <Typography color="textSecondary" variant="caption">
                      Compared to similar events
                    </Typography>
                  </StatBox>
                </DashboardCard>
              </StyledGrid>

              <StyledGrid>
                <DashboardCard
                  title="Guests Paid"
                  iconColor="#FFB020"
                  icon={<GroupIcon />}
                  mainStat={
                    Math.floor(
                      (data!.paidGuests.current / data!.paidGuests.max) * 100
                    ) + "%"
                  }
                >
                  <Box sx={{ pt: 3 }}>
                    <LinearProgress
                      value={Math.floor(
                        (data!.paidGuests.current / data!.paidGuests.max) * 100
                      )}
                      variant="determinate"
                    />
                  </Box>
                </DashboardCard>
              </StyledGrid>
              <StyledGrid>
                <DashboardCard
                  title="Money Collected"
                  iconColor="#14B8A6"
                  icon={<AttachMoneyIcon />}
                  mainStat={data!.totalAmount + "$"}
                ></DashboardCard>
              </StyledGrid>
              <Grid item lg={8} sm={12} xl={8} xs={12}>
                <DashboardChart records={data!.amountDistribution} />
              </Grid>
            </Grid>
          </CenteringContainer>
        </Stack>
      );
  };

  return (
    <>
      <SideBar />
      {renderContent()}
    </>
  );
};

export default Dashboard;
