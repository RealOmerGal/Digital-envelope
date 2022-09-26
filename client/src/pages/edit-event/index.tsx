import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Stack,
} from "@mui/material";
import SideBar from "../../components/sidebar";
import DashboardToolbar from "../../components/toolbar";
import { useForm } from "../../hooks/useForm";
import { useEventStore } from "../../stores/event-store";
import { Event, EventTypes } from "../../types/event";
import { ButtonContainer, StyledGridItem } from "./styles";
import { showConfirmMessage } from "../../utils/confirm-message.util";
import { showSuccessMessage } from "../../utils/success-message.util";

const EditEvent = () => {
  const { event, updateEvent } = useEventStore();

  const handleSubmit = () => {
    showConfirmMessage({
      title: "Save changes",
      text: "Are you sure you want to save youre changes?",
      handleYes: async () => {
        try {
          await updateEvent(values!);
          showSuccessMessage({ title: "Changes saved" });
        } catch (e) {}
      },
    });
  };
  const { onChange, onSubmit, values } = useForm<Event>(handleSubmit, event!);

  return (
    <>
      <SideBar />
      <Stack sx={{ pt: 5, pr: 2, flexGrow: 1 }}>
        <DashboardToolbar />
        <form autoComplete="off" onSubmit={onSubmit} noValidate>
          <Card sx={{ mt: 5 }}>
            <CardHeader
              title="Event settings"
              subheader="You can change the any of the events settings here"
            ></CardHeader>
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <StyledGridItem>
                  <TextField
                    fullWidth
                    label="Event name"
                    name="name"
                    required
                    variant="outlined"
                    onChange={onChange}
                    value={values.name}
                    inputProps={{
                      pattern: ".{3,20}",
                      title: "3-20 characters",
                    }}
                  />
                </StyledGridItem>
                <StyledGridItem>
                  <TextField
                    fullWidth
                    label="Guests"
                    name="estimatedGuests"
                    required
                    variant="outlined"
                    onChange={onChange}
                    value={values.estimatedGuests}
                  />
                </StyledGridItem>
                <StyledGridItem>
                  <FormControl>
                    <FormLabel>Event type</FormLabel>
                    <RadioGroup
                      row
                      sx={{ pl: 1 }}
                      name="type"
                      onChange={onChange}
                      value={values.type}
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
                </StyledGridItem>
              </Grid>
            </CardContent>
            <Divider />
            <ButtonContainer>
              <Button color="primary" type="submit" variant="contained">
                Save changes
              </Button>
            </ButtonContainer>
          </Card>
        </form>
      </Stack>
    </>
  );
};

export default EditEvent;
