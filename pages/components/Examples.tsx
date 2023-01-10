import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

const EXAMPLES = [
  "I want to keep up-to-date on the deep learning sector, but I don 't know where I can see it.",
  "I want to keep up-to-date on the deep learning sector, but I don 't know where I can see it.",
  "I want to keep up-to-date on the deep learning sector, but I don 't know where I can see it.",
];

const Examples = () => {
  return (
    <ExampleContainer>
      <Accordion>
        {EXAMPLES.map((item, i) => {
          return (
            <AccordionItem key={i}>
              <ExampleWrapper>
                <div>See Example ➡</div>
                <div>{item}</div>
              </ExampleWrapper>
              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </ExampleContainer>
  );
};

export default Examples;

const ExampleContainer = styled.div`
  width: 700px;
  margin-top: 50px;

  @media (max-width: 700px) {
    width: 90%;
  }
`;

const ExampleWrapper = styled(AccordionButton)`
  padding: 5px;
  border-radius: 8px;
  margin: 7px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;
