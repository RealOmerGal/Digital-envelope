import React, { useEffect, useState } from "react";
import { Blessing } from "../../types/blessing";
import {
  Table,
  TableHead,
  TableBody,
  Card,
  TablePagination,
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
import Loading from "../../components/Loading";

const ShowBlessings = () => {
  const [page, setPage] = useState(0);
  const [take, setTake] = useState(5);
  const [count, setCount] = useState<number>(10);
  const [blessings, setBlessings] = useState<Blessing[]>([]);

  useEffect(() => {
    fetchBlessings();
  }, [page, take]);

  const getBlessings = async () => {
    const data = await BlessingService.getByEvent(page * take, take);
    setBlessings(data.result);
    setCount(data.count);
  };

  const { activateFunc: fetchBlessings, loading } = useLoading(getBlessings);

  const handlePageChange = (e: unknown, newPage: number) => {
    setPage((prev) => newPage);
  };
  const handleRowsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTake((prev) => parseInt(e.target.value, 10));
    setPage(0);
  };
  const renderContent = () => {
    if (loading) return <Loading />;
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
                <BlessingRow key={blessing.id} blessing={blessing} />
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="section"
            count={count}
            page={page}
            rowsPerPage={take}
            onPageChange={handlePageChange}
            rowsPerPageOptions={[5, 10, 20]}
            onRowsPerPageChange={handleRowsChange}
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
