import React from "react";
import { useForm } from "../../hooks/useForm";
import { useEventStore } from "../../states/event-store";
import { EventTypes, ICreateEvent } from "../../types/event";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import CenteringContainer from "../../components/CenteringContainer";
import SideBar from "../../components/sidebar";
import { EventService } from "../../services/event.service";
import { useUserStore } from "../../states/user-store";
import { showConfirmMessage } from "../../utils";

const CreateEvent: React.FC<any> = () => {
  const { setEvent } = useEventStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    showConfirmMessage({
      text: "Your new event will be created immediately",
      handleYes: async () => {
        const newEvent = await EventService.create(values);
        setEvent(newEvent);
        navigate("/dashboard");
      },
    });
  };

  const { onChange, onSubmit, values } = useForm<ICreateEvent>(handleSubmit, {
    estimatedGuests: 0,
    name: "",
    type: EventTypes.Other,
  });

  return (
    <>
      <SideBar />
      <CenteringContainer sx={{ pl: 2, pt: 4 }}>
        <Container maxWidth="sm">
          <form onSubmit={onSubmit}>
            <Box sx={{ py: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Congratulation, {user.firstName}
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                What are we celebrating?
              </Typography>
            </Box>
            <TextField
              fullWidth
              margin="normal"
              name="name"
              label="Event's name"
              value={values.name}
              onChange={onChange}
              required
              inputProps={{
                pattern: ".{3,20}",
                title: "3-20 characters",
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              name="estimatedGuests"
              label="Guests exptected to attend"
              value={values.estimatedGuests}
              onChange={onChange}
              required
              inputProps={{
                pattern: "[0-9]+",
                title: "Only digits are allowed",
              }}
            />
            <FormControl>
              <FormLabel>Event type</FormLabel>
              <RadioGroup
                row
                sx={{ pl: 2 }}
                name="type"
                value={values.type}
                onChange={onChange}
              >
                {Object.keys(EventTypes).map((type) => (
                  <FormControlLabel
                    key={type}
                    value={type}
                    control={<Radio />}
                    label={type}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Box sx={{ py: 2 }}>
              <Button fullWidth size="large" type="submit" variant="contained">
                Create event
              </Button>
            </Box>
          </form>
        </Container>
      </CenteringContainer>
    </>
  );
};

export default CreateEvent;
