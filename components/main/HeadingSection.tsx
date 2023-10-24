import React from 'react'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

const HeadingSection = () => {
  return (
    <Center>
      <h1>HYPER CHALLENGES</h1>
      <h2>
        <span>Coding Test</span> & <span>Allgorithms</span>.
      </h2>
    </Center>
  )
}

export default HeadingSection

const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  text-align: left;
  padding: 40px 0px;

  h1 {
    font-size: 8em;
    text-align: left;
    font-weight: 900;
    line-height: 1.2em;
  }
  h2 {
    font-size: 4.5em;
    text-align: left;
    font-weight: 900;

    span {
      color: ${({ theme }) => theme.blue01};
    }
  }
`
