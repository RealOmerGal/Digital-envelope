import { Box, Stack } from "@mui/material";
import { useRef } from "react";
import Swal from "sweetalert2";
import CenteringContainer from "../../components/CenteringContainer";
import { AuthService } from "../../services/auth.service";
import DocsStep from "./components/docs-step";
import { Header, Layout, SpacedButton } from "./styles";

const HomePage = () => {
  const docsRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    docsRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleLogin = () => {
    Swal.fire({
      title: "Sign in",
      text: "At this time, we only support Google as an authentication method",
      confirmButtonText: "Sign in with google",
      confirmButtonColor: "#5048E5",
      cancelButtonColor: "#f27474",
      showCancelButton: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        AuthService.login();
      }
    });
  };

  return (
    <Layout>
      <CenteringContainer direction="column" sx={{ height: "90vh" }}>
        <Header>Digital Envelope</Header>
        <Box>
          <SpacedButton variant="contained" onClick={handleLogin}>
            Get started
          </SpacedButton>
          <SpacedButton variant="outlined" onClick={handleScroll}>
            How it works
          </SpacedButton>
        </Box>
      </CenteringContainer>
      <CenteringContainer ref={docsRef} direction="column">
        <DocsStep
          header="Sign in with your google account"
          imgSrc="../../../../assets/google-sign-in.PNG"
        />
        <DocsStep
          header="Create an event"
          imgSrc="../../../../assets/google-sign-in.PNG"
        />
        <DocsStep
          header="Publish the generated QR"
          imgSrc="../../../../assets/google-sign-in.PNG"
        />
        <DocsStep
          header="Track your event's blessings and recieve insights at anytime"
          imgSrc="../../../../assets/google-sign-in.PNG"
        />
      </CenteringContainer>
    </Layout>
  );
};

export default HomePage;
