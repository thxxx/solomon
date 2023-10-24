import { ArrowForwardIcon } from '@chakra-ui/icons'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import FeedbackModal from './FeedbackModal'

const AppBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <AppBarContainer>
      <span>AppBar</span>
      <span
        onClick={() => {
          onOpen()
        }}
      >
        <ArrowForwardIcon />
      </span>
      <FeedbackModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </AppBarContainer>
  )
}

export default React.memo(AppBar)

const AppBarContainer = styled.div`
  z-index: 2;
  width: 100%;
  background: white;
  color: black;
  padding: 14px 4vw;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 600px) {
    font-size: 10px;
  }
`
