import { Box } from "@mui/material";
import React from "react";
import { SectionContainer, SectionHeader } from "./styles";

function GoogleSignInSection() {
  return (
    <SectionContainer>
      <SectionHeader>Sign in with your Google account</SectionHeader>
      <img src="../../../../assets/google-sign-in.PNG" />
    </SectionContainer>
  );
}

export default GoogleSignInSection;
