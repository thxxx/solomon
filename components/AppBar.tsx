import { ArrowForwardIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import React, { useState } from "react";
import axios from "axios";

const API_PATH = "https://b9zm4cxhn1.execute-api.us-west-2.amazonaws.com/v1";

const AppBar = () => {
  const [out, setOut] = useState<any>();
  const openFeedback = async () => {
    console.log("클릭 1");

    const body = {
      url: "https://www.bvp.com/atlas/entering-the-era-of-intelligent-search/?from=feature",
      query: "Wow it's awesome",
      history: [],
    };

    const response = await fetch("/api/hello", {
      method: "POST",
      body: JSON.stringify({
        url: "https://www.bvp.com/atlas/entering-the-era-of-intelligent-search/?from=feature",
        query: "Wow it's awesome",
        history: [],
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const output = await response.json();
    setOut(output);
    console.log("클릭 2", output.data[0]);
  };

  return (
    <AppBarContainer onClick={() => openFeedback()}>
      Do you have any feedback? ✋🏻 <ArrowForwardIcon />
      <div
        dangerouslySetInnerHTML={{
          __html: out,
        }}></div>
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
