import { Box, Grid, LinearProgress, Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import IDashboard from "../../types/dashboard";
import DashboardCard from "./components/item";
import { StatBox, StyledGrid } from "./styles";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import DashboardToolbar from "../../components/toolbar";
import SideBar from "../../components/sidebar";
import { AppService } from "../../services/app.service";
import DashboardChart from "./components/chart";
import CenteringContainer from "../../components/CenteringContainer";
import useLoading from "../../hooks/useLoading";
import Loading from "../../components/Loading";
import SimilarEventStat from "./components/SimilarEventStat";
import formatter from "../../utils/currency-formatter.util";
const Dashboard = () => {
  const [data, setData] = useState<IDashboard>();

  const getData = async () => {
    const data = await AppService.generateDashboard();
    setData((prev) => data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const { activateFunc: fetchData, loading } = useLoading(getData);

  const renderContent = () => {
    if (loading) return <Loading />;

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
            <Grid
              container
              spacing={3}
              sx={{ width: { xs: "90vw", sm: "85vw" } }}
            >
              <StyledGrid>
                <DashboardCard
                  title="Average Per Guest"
                  iconColor="#D14343"
                  icon={<InsertChartIcon />}
                  mainStat={formatter.format(data!.averagePerGuest.avg)}
                >
                  <StatBox>
                    <SimilarEventStat
                      data={data!.averagePerGuest.comparedToSimilar}
                    />
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
                  //TODO: Find a nicer way to do this
                  mainStat={formatter.format(
                    +data!.totalAmount.substring(1).replace(",", "")
                  )}
                ></DashboardCard>
              </StyledGrid>
              <Grid item lg={12} sm={12} xl={12} xs={12}>
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
