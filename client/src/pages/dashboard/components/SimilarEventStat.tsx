import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";

function SimilarEventStat(props: any) {
  const renderEventState = () => {
    const rounded = Math.round(props.data);
    if (rounded === 0 || rounded === 100) {
      return (
        <Typography
          color={"success"}
          sx={{
            mr: 1,
          }}
          variant="body2"
        >
          {"0%"}
        </Typography>
      );
    }
    if (rounded > 100) {
      return (
        <>
          <ArrowUpward color="success" />
          <Typography
            color={"success"}
            sx={{
              mr: 1,
            }}
            variant="body2"
          >
            {rounded - 100 + "%"}
          </Typography>
        </>
      );
    }
    return (
      <>
        <ArrowDownward color="error" />
        <Typography
          color={"error"}
          sx={{
            mr: 1,
          }}
          variant="body2"
        >
          {rounded + "%"}
        </Typography>
      </>
    );
  };
  return (
    <>
      {renderEventState()}
      <Typography color="textSecondary" variant="caption">
        Compared to similar events
      </Typography>
    </>
  );
}

export default SimilarEventStat;
