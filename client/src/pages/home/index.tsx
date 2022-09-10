import { Box } from "@mui/material";
import Swal from "sweetalert2";
import { AuthService } from "../../services/auth.service";
import GoogleSignInSection from "./components/google-section";
import {
  Header,
  InnerContainer,
  Layout,
  Scrollable,
  SpacedButton,
} from "./styles";

const HomePage = () => {
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
      <InnerContainer>
        <Header>Digital Envelope</Header>
        <Box>
          <SpacedButton variant="outlined" onClick={handleLogin}>
            Log In
          </SpacedButton>
          <SpacedButton variant="contained" onClick={handleLogin}>
            Get started
          </SpacedButton>
        </Box>
      </InnerContainer>
      <Scrollable>
        <GoogleSignInSection />
        <GoogleSignInSection />
        <GoogleSignInSection />
      </Scrollable>
    </Layout>
  );
};

export default HomePage;
