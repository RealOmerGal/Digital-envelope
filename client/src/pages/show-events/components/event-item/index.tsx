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
import { Link } from "react-router-dom";
import { EventService } from "../../../../services/event.service";
import { useEventStore } from "../../../../states/event-store";
import { Event } from "../../../../types/event";
import { CardContainer } from "./styles";

const EventItem: React.FC<{ event: Event }> = ({ event }) => {
  const setEvent = useEventStore((state) => state.setEvent);
  const createdAt = new Date(event.createdAt).toLocaleDateString();

  const storeEvent = async () => {
    await EventService.store(event);
    setEvent(event);
  };

  return (
    <CardContainer>
      <Link
        style={{ textDecoration: "none" }}
        onClick={storeEvent}
        to={"/dashboard"}
      >
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
      </Link>
    </CardContainer>
  );
};

export default EventItem;
