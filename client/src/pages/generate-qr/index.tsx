import { ArrowBack } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CenteringContainer from "../../components/CenteringContainer";
import { AppService } from "../../services/app.service";
import { useEventStore } from "../../stores/event-store";
import { StyledBox, StyledPaper } from "./styles";

export default function GenerateQr() {
  const { event } = useEventStore();
  const navigate = useNavigate();

  const qr = AppService.generateQr(
    `${import.meta.env.VITE_CLIENT_URL}/blessings/${event.id}`,
    event.name
  );
  return (
    <StyledBox>
      <Button
        onClick={() => navigate("/dashboard")}
        startIcon={<ArrowBack fontSize="small" />}
        sx={{ alignItems: "flex-start" }}
      >
        Overview
      </Button>
      <CenteringContainer>
        <StyledPaper>
          <Typography variant="h2" textAlign="center">
            {event.name}
          </Typography>
          <img src={qr} alt="LOADING_QR" title="QR" />
          <Typography variant="caption">
            Scan the QR code to participate
          </Typography>
        </StyledPaper>
      </CenteringContainer>
    </StyledBox>
  );
}
