import React, { useEffect, useState } from "react";
import Toolbar from "./components/toolbar";
import { useEventStore } from "../../states/event-store";
import { Blessing } from "../../types/blessing";
import { SortOptions } from "../../types/sort-options";
import SideBar from "../../components/sidebar";
import { BlessingContainer } from "./styles";
import DashboardToolbar from "../../components/toolbar";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  Chip,
  Card,
  TablePagination,
} from "@mui/material";
import BlessingsToolbar from "./components/toolbar";
import Swal from "sweetalert2";
import { BlessingService } from "../../services/blessing.service";

const ShowBlessings: React.FC<any> = () => {
  const { event } = useEventStore();
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [filtered, setFiltered] = useState<Blessing[]>([]);
  useEffect(() => {
    fetchBlessings();
  }, []);

  const fetchBlessings = async () => {
    //TODO: replace to event.id
    const data = await BlessingService.getByEvent(8);
    setBlessings(data);
    setFiltered(data);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const query = e.currentTarget.value.toLowerCase() as string;
    if (query !== "") {
      const result = blessings.filter(
        (blessing: Blessing) =>
          blessing && blessing.createdBy.toLowerCase().includes(query)
      );
      setFiltered(result);
    } else {
      setFiltered(blessings);
    }
  };

  const showModal = (by: string, text: string) => {
    Swal.fire({ title: by + ":", text, confirmButtonColor: "#5048E5" });
  };
  return (
    <>
      <SideBar />
      <BlessingContainer>
        <>
          <DashboardToolbar />
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
                {filtered.map((blessing) => {
                  return (
                    <TableRow
                      hover
                      key={blessing.id}
                      onClick={() =>
                        showModal(blessing.createdBy, blessing.text)
                      }
                    >
                      <TableCell>
                        <Typography color="textPrimary" variant="body1">
                          {blessing.createdBy}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {new Date(blessing.createdAt).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell
                        width={"50%"}
                        sx={{
                          maxWidth: "20vw",
                          overflow: "hidden",
                        }}
                      >
                        <Typography>{blessing.text}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip color="success" label={blessing.paymentAmount} />
                      </TableCell>
                    </TableRow>
                  );
                })}
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
        </>
      </BlessingContainer>
    </>
  );
};

export default ShowBlessings;
