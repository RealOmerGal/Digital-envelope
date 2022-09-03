import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { ToolbarContainer } from "./styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEventStore } from "../../states/event-store";
import { useNavigate } from "react-router-dom";
import { EventService } from "../../services/event.service";
import { showConfirmMessage } from "../../utils/confirm-message.util";

const DashboardToolbar: React.FC<any> = () => {
  const { event, setEvent, clearEvent } = useEventStore();
  const navigate = useNavigate();

  const fetchEvent = async () => {
    const event = await EventService.current(() => navigate("/events"));
    setEvent(event);
  };

  useEffect(() => {
    if (event.id === 0) fetchEvent();
  }, []);

  const confirmDeletion = () => {
    showConfirmMessage({
      title: "Are you sure?",
      text: "The event will be deleted, theres no going back!",
      handleYes: handleDelete,
    });
  };

  const handleDelete = async () => {
    await EventService.delete(event.id);
    clearEvent();
    navigate("/events/");
  };

  const handleStateReverse = async () => {
    event.closed = !event.closed;
    const newEvent = await EventService.reverseOpeningState(event.closed);
    setEvent(newEvent);
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
