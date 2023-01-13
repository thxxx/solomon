import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";

const EXAMPLES = [
  "I want to keep up-to-date on the deep learning sector, but I don 't know where I can see it.",
  "It's too hard for me to make and maintain good relationships. I'm not that outgoing.",
  "I have to go on a diet, but I can't resist the urge to eat food.",
];

const Examples = () => {
  return (
    <ExampleContainer>
      <Accordion>
        {EXAMPLES.map((item, i) => {
          return (
            <AccordionItem key={i}>
              <ExampleWrapper>
                <p className="label">Try this : </p>
                <p>{item}</p>
              </ExampleWrapper>
              <AccordionPanel pb={4}>
                {i === 0 && (
                  <Image src="/deep.png" width={680} height={470} alt="diet" />
                )}
                {i === 1 && (
                  <Image
                    src="/social.png"
                    width={680}
                    height={470}
                    alt="diet"
                  />
                )}
                {i === 2 && (
                  <Image src="/diet.png" width={680} height={470} alt="diet" />
                )}
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </ExampleContainer>
  );
};

export default React.memo(Examples);

const ExampleContainer = styled.div`
  width: 700px;
  margin-top: 50px;
  padding: 20px 0px;

  img {
    border: 5px solid rgba(10, 10, 10, 0.1);
    border-radius: 6px;
  }

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
  padding: 20px 0px;

  .label {
    color: ${({ theme }) => theme.blue01};
    font-weight: 700;
  }
`;
