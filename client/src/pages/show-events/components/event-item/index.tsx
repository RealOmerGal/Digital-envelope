import { Check, Block, Event as EventIcon, People } from "@mui/icons-material";
import {
  Button,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEventStore } from "../../../../stores/event-store";
import { Event } from "../../../../types/event";
import { ButtonContainer, CardContainer } from "./styles";

const EventItem: React.FC<{ event: Event }> = ({ event }) => {
  const { storeEvent } = useEventStore();
  const createdAt = new Date(event.createdAt).toLocaleDateString();
  const navigate = useNavigate();
  const handleItemClick = async () => {
    await storeEvent(event);
    navigate("/dashboard");
  };
  const chip = event.closed ? (
    <Box display="flex" sx={{ gap: "10px" }}>
      <Block color="error" />
      <Typography color="error" variant="subtitle1">
        {"Closed"}
      </Typography>
    </Box>
  ) : (
    <Box display="flex" sx={{ gap: "10px" }}>
      <Check color="success" />
      <Typography color="success" variant="subtitle1">
        {"Open"}
      </Typography>
    </Box>
  );
  return (
    <CardContainer sx={{ borderColor: "red" }}>
      <Box>
        <CardHeader
          title={<Box color="black"> {event.name}</Box>}
          subheader={"Created at: " + createdAt}
        />
        <Divider />
        <CardContent>
          <Box display="flex" sx={{ gap: "10px" }}>
            <EventIcon sx={{ color: "grayText" }} />
            <Typography color="black" variant="subtitle1">
              {event.type}
            </Typography>
          </Box>
          <Box display="flex" sx={{ gap: "10px" }}>
            <People sx={{ color: "grayText" }} />
            <Typography color="black" variant="subtitle1">
              {event.estimatedGuests}
            </Typography>
          </Box>
          {chip}
        </CardContent>
        <ButtonContainer>
          <Button variant="contained" onClick={handleItemClick}>
            Select
          </Button>
        </ButtonContainer>
      </Box>
    </CardContainer>
  );
};

export default EventItem;
