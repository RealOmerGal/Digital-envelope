import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateBlessingDto } from "../../types/blessing";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import CenteringContainer from "../../components/CenteringContainer";
import { CreatePaymentDto } from "../../types/payment";
import { BlessingService } from "../../services/blessing.service";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { showErrorMessage } from "../../utils/error-message.util";

const SubmitBlessing: React.FC<any> = () => {
  const eventId = parseInt(useParams().eventid!);

  const [eventName, setEventName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("eventName") ?? "";
    setEventName((prev) => name);
  }, []);

  const [paymentDto, setPaymnetDto] = useState<CreatePaymentDto>({
    amount: 0,
    email: "",
  });
  const [blessingDto, setBlessingDto] = useState<CreateBlessingDto>({
    createdBy: "",
    text: "",
    eventId,
  });
  const elements = useElements();
  const stripe = useStripe();

  const handleSubmit = async (e: any) => {
    if (
      blessingDto.createdBy &&
      eventId &&
      blessingDto.text &&
      paymentDto.amount &&
      paymentDto.email
    ) {
      e.preventDefault();
      const cardElement = elements!.getElement(CardElement);
      const { error, paymentMethod } = await stripe!.createPaymentMethod({
        type: "card",
        card: cardElement!,
        billing_details: { email: paymentDto.email },
      });

      if (error) {
        showErrorMessage({
          title: "Payment failed",
          errorString: error.message,
        });
      } else {
        await BlessingService.create(
          blessingDto,
          {
            ...paymentDto,
            token: paymentMethod.id,
          },
          () => navigate("/")
        );
      }
    }
  };
  if (!stripe || !elements) {
    return <></>;
  }

  return (
    <CenteringContainer>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
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
            value={blessingDto.createdBy}
            onChange={(e) => {
              setBlessingDto({
                ...blessingDto,
                createdBy: e.target.value,
              });
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            name="amount"
            label="Amount to pay (USD $)"
            value={paymentDto.amount}
            onChange={(e) =>
              setPaymnetDto({
                ...paymentDto,
                amount: parseInt(e.target.value),
              })
            }
            inputProps={{ inputMode: "numeric" }}
          />
          <TextField
            fullWidth
            multiline
            margin="normal"
            name="text"
            label="Your blessing..."
            value={blessingDto.text}
            onChange={(e) => {
              setBlessingDto({
                ...blessingDto,
                text: e.target.value,
              });
            }}
          />
          <TextField
            fullWidth
            multiline
            margin="normal"
            name="email"
            label="Billing email"
            value={paymentDto.email}
            onChange={(e) =>
              setPaymnetDto({
                ...paymentDto,
                email: e.target.value,
              })
            }
          />
          <Box sx={{ p: 2, border: "1px solid #E6E8F0", borderRadius: "8px" }}>
            <CardElement options={{ hidePostalCode: true }} />
          </Box>
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
