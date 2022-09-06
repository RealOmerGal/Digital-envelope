import { Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CenteringContainer from "../../components/CenteringContainer";
import Loading from "../../components/Loading";
import SideBar from "../../components/sidebar";
import useLoading from "../../hooks/useLoading";
import { EventService } from "../../services/event.service";
import { Event } from "../../types/event";
import EventItem from "./components/event-item";
import { StyledGrid } from "./styles";

const ShowEvents: React.FC<any> = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const getEvents = async () => {
    const data = await EventService.getByUser();
    setEvents((prev) => data);
  };

  const { activateFunc: fetchEvents, loading } = useLoading(getEvents);

  const renderContent = () => {
    if (loading) return <Loading />;

    if (events.length > 0) {
      return (
        <>
          <CenteringContainer>
            <Container>
              <Grid container spacing={3}>
                {events.map((event: Event) => {
                  return (
                    <StyledGrid key={event.id}>
                      <EventItem event={event} />
                    </StyledGrid>
                  );
                })}
              </Grid>
            </Container>
          </CenteringContainer>
        </>
      );
    }
    return (
      <>
        <CenteringContainer
          direction="column"
          sx={{ gap: "50px", height: "80vh" }}
        >
          <Typography variant="h4">
            Oops, looks like you havent created an event yet...
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/event/create")}
          >
            Create your first event!
          </Button>
        </CenteringContainer>
      </>
    );
  };
  return (
    <>
      <SideBar />
      {renderContent()}
    </>
  );
};

export default ShowEvents;
