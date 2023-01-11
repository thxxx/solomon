import { ArrowForwardIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import FeedbackModal from "./FeedbackModal";

const AppBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <AppBarContainer
      onClick={() => {
        onOpen();
      }}>
      Do you have any feedback? ✋🏻 <ArrowForwardIcon />
      <FeedbackModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </AppBarContainer>
  );
};

export default React.memo(AppBar);

const AppBarContainer = styled.div`
  z-index: 2;
  width: 100%;
  background: black;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
`;
