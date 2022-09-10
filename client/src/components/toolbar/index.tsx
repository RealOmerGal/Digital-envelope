import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { ToolbarContainer } from "./styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEventStore } from "../../stores/event-store";
import { useNavigate } from "react-router-dom";
import { showConfirmMessage } from "../../utils/confirm-message.util";

const DashboardToolbar: React.FC<any> = () => {
  const { event, fetchEvent, deleteEvent, updateEvent } = useEventStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (event.id === 0) fetchEvent(() => navigate("/events"));
  }, []);

  const confirmDeletion = () => {
    showConfirmMessage({
      title: "Are you sure?",
      text: "The event will be deleted, theres no going back!",
      handleYes: handleDelete,
    });
  };

  const handleDelete = async () => {
    await deleteEvent(event.id);
    navigate("/events/");
  };

  const handleStateReverse = async () => {
    event.closed = !event.closed;
    await updateEvent(event);
  };

  const confirmClosing = () => {
    showConfirmMessage({
      title: "Closed event",
      text: "When event is closed, they cannot recieve new blessings",
      handleYes: handleStateReverse,
    });
  };

  return (
    <>
      <ToolbarContainer>
        <Typography variant="h4" sx={{ mb: { sm: 1, xs: 1 } }}>
          {event.name}
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={<DeleteIcon fontSize="small" />}
            sx={{ mr: 1 }}
            onClick={confirmDeletion}
          >
            Delete
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={event.closed ? handleStateReverse : confirmClosing}
          >
            {event.closed ? "Open" : "Close"} event
          </Button>
        </Box>
      </ToolbarContainer>
    </>
  );
};

export default DashboardToolbar;
