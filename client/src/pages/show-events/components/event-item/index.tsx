import { Check, Block, Event as EventIcon, People } from "@mui/icons-material";
import {
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEventStore } from "../../../../stores/event-store";
import { Event } from "../../../../types/event";
import { CardContainer } from "./styles";

const EventItem: React.FC<{ event: Event }> = ({ event }) => {
  const { storeEvent } = useEventStore();
  const createdAt = new Date(event.createdAt).toLocaleDateString();
  const navigate = useNavigate();
  const handleItemClick = async () => {
    await storeEvent(event);
    navigate("/dashboard");
  };

  return (
    <CardContainer>
      <Box sx={{ cursor: "pointer" }} onClick={handleItemClick}>
        <CardHeader
          title={<Box color="black"> {event.name}</Box>}
          subheader={"Created at: " + createdAt}
        />
        <Divider />
        <CardContent>
          <Box display="flex" sx={{ gap: "10px" }}>
            <EventIcon sx={{ color: "grayText" }} />
            <Typography color="black" variant="body1">
              {event.type}
            </Typography>
          </Box>
          <Box display="flex" sx={{ gap: "10px" }}>
            <People sx={{ color: "grayText" }} />
            <Typography color="black" variant="body1">
              {event.estimatedGuests}
            </Typography>
          </Box>
        </CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ pb: 1, pl: 1 }}>
            {event.closed ? (
              <Chip
                label={"Closed"}
                color={"error"}
                sx={{ fontWeight: "600" }}
                icon={<Block />}
              />
            ) : (
              <Chip
                label={"Open"}
                color={"success"}
                sx={{ fontWeight: "600" }}
                icon={<Check />}
              />
            )}
          </Box>
        </Box>
      </Box>
    </CardContainer>
  );
};

export default EventItem;
