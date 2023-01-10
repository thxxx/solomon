import { ArrowForwardIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import React from "react";

const AppBar = () => {
  return (
    <AppBarContainer>
      Do you have any feedback? ✋🏻 <ArrowForwardIcon />
    </AppBarContainer>
  );
};

export default AppBar;

const AppBarContainer = styled.div`
  z-index: 2;
  width: 100%;
  background: black;
  color: white;
  padding: 12px 20px;
`;
