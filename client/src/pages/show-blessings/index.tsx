import React, { useEffect, useState } from "react";
import { useEventStore } from "../../states/event-store";
import { Blessing } from "../../types/blessing";
import {
  Table,
  TableHead,
  TableBody,
  Card,
  TablePagination,
  CircularProgress,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { BlessingService } from "../../services/blessing.service";
import useLoading from "../../hooks/useLoading";
import BlessingRow from "./components/BlessingRow";
import { BlessingContainer } from "./styles";
import SideBar from "../../components/sidebar";
import DashboardToolbar from "../../components/toolbar";
import CenteringContainer from "../../components/CenteringContainer";

const ShowBlessings = () => {
  const { event } = useEventStore();
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  useEffect(() => {
    fetchBlessings();
  }, []);

  const getBlessings = async () => {
    const data = await BlessingService.getByEvent(event.id);
    setBlessings(data);
  };

  const { activateFunc: fetchBlessings, loading } = useLoading(getBlessings);

  const renderContent = () => {
    if (loading) return <CircularProgress />;
    if (blessings && blessings.length > 0)
      return (
        <Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Blessing</TableCell>
                <TableCell align="center">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ cursor: "pointer" }}>
              {blessings.map((blessing) => (
                <BlessingRow blessing={blessing} />
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="section"
            count={blessings.length}
            page={0}
            rowsPerPage={5}
            onPageChange={() => console.log("Page")}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Card>
      );
    return (
      <CenteringContainer sx={{ height: "80vh" }}>
        <Typography variant="h4"> No blessings yet...</Typography>
      </CenteringContainer>
    );
  };

  return (
    <>
      <SideBar />
      <BlessingContainer>
        <DashboardToolbar />
        {renderContent()}
      </BlessingContainer>
    </>
  );
};

export default ShowBlessings;
