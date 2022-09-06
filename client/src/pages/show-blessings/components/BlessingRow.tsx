import { TableCell, TableRow, Typography, Chip } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";

const BlessingRow: React.FC<any> = ({ blessing }) => {
  const showModal = (by: string, text: string) => {
    Swal.fire({ title: by + ":", text, confirmButtonColor: "#5048E5" });
  };

  return (
    <TableRow
      hover
      onClick={() => showModal(blessing.createdBy, blessing.text)}
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
        <Chip color="success" label={blessing.payment.amount} />
      </TableCell>
    </TableRow>
  );
};

export default BlessingRow;
