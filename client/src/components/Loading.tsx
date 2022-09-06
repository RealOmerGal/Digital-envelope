import { CircularProgress } from "@mui/material";
import React from "react";
import CenteringContainer from "./CenteringContainer";

const Loading = () => {
  return (
    <CenteringContainer sx={{ height: "90vh" }}>
      <CircularProgress />
    </CenteringContainer>
  );
};

export default Loading;
