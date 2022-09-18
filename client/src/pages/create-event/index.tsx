import React, { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { useEventStore } from "../../stores/event-store";
import { EventTypes, CreateEventDto } from "../../types/event";
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
import { useUserStore } from "../../stores/user-store";
import { showConfirmMessage } from "../../utils/confirm-message.util";
import { addPaymentProfileMessage } from "../../utils/add-payment-profile.util";

const CreateEvent: React.FC<any> = () => {
  const { createEvent } = useEventStore();
  const { user, storeUpdatedUser } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    showConfirmMessage({
      text: "Your new event will be created immediately",
      handleYes: async () => {
        await createEvent(values);
        navigate("/dashboard");
      },
    });
  };
  const updateUsersPaymentProfile = async () => {
    const updatedUser = await addPaymentProfileMessage();
    if (updatedUser !== null) {
      storeUpdatedUser(updatedUser);
    }
  };
  useEffect(() => {
    if (!user.paymentProfileId) {
      updateUsersPaymentProfile();
    }
  }, []);
  const { onChange, onSubmit, values } = useForm<CreateEventDto>(handleSubmit, {
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
