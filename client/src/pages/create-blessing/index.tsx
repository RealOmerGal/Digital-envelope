import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { ICreateBlessing } from "../../types/blessing";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import CenteringContainer from "../../components/CenteringContainer";
import { BlessingService } from "../../services/blessing.service";

const SubmitBlessing: React.FC<any> = () => {
  /*
    TODO: when payments will be implmeneted, need to save blessing to global store, and use it in the payment page,
          some of the code alread exists but need to be uncommnected
  */
  // const { setBlessing, blessing } = useBlessingStore();
  const eventId = parseInt(useParams().eventid!);

  const [eventName, setEventName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("eventName") ?? "";
    setEventName((prev) => name);
  }, []);

  const handleSubmit = async () => {
    // setBlessing({ ...values, eventId });
    await BlessingService.create(values);
    clearForm();
  };

  const { onChange, onSubmit, values, clearForm } = useForm<ICreateBlessing>(
    handleSubmit,
    {
      createdBy: "",
      eventId,
      text: "",
      amount: 0,
    }
  );

  return (
    <CenteringContainer>
      <Container maxWidth="sm">
        <form onSubmit={onSubmit}>
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              {"Welcome to " + eventName}
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Submit your blessing for the event
            </Typography>
          </Box>
          <TextField
            fullWidth
            margin="normal"
            name="createdBy"
            label="Your name"
            value={values.createdBy}
            onChange={onChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="amount"
            label="Amount to pay (USD $)"
            value={values.amount}
            onChange={onChange}
            inputProps={{ inputMode: "numeric" }}
          />
          <TextField
            fullWidth
            multiline
            margin="normal"
            name="text"
            label="Your blessing..."
            value={values.text}
            onChange={onChange}
          />
          <Box sx={{ py: 2 }}>
            <Button fullWidth size="large" type="submit" variant="contained">
              Submit
            </Button>
          </Box>
          <Box>
            <Typography color="textSecondary" variant="body2">
              Having an event soon?{" "}
              <Link
                variant="subtitle2"
                underline="hover"
                onClick={() => navigate("/")}
              >
                Join us
              </Link>
            </Typography>
          </Box>
        </form>
      </Container>
    </CenteringContainer>
  );
};

export default SubmitBlessing;
