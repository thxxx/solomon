import {
  Button,
  Divider,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useStore } from "../../utils/store";
import router from "next/router";
import styled from "@emotion/styled";
import { dummy, greetings } from "../../utils/utters";
import { CustomButton, CustomTextarea } from "..";
import { ArrowForwardIcon, AtSignIcon, ChatIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { dbService } from "../../utils/fbase";
import FeedbackModal from "../../components/FeedbackModal";
import Head from "next/head";
import axios from "axios";

enum ChatType {
  bot = "bot",
  client = "client",
}

type ChatOne = {
  type: ChatType;
  text: string;
};

const Answer: NextPage = () => {
  const [text, setText] = useState("");
  const [responses, setResponses] = useState<any[]>([]);
  const [greeting, setGreeting] = useState<string>("");
  const [chats, setChats] = useState<ChatOne[]>();
  const [loading, setLoading] = useState(false);
  const { question, uid, answer } = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const splited_answer = answer
      .split("\n")
      .filter((doc) => doc && doc.length > 4);
    console.log("스플리티드", splited_answer);
    let res: any[] = [];
    for (let i = 1; i < splited_answer.length; i++) {
      if (splited_answer[i].includes("Solution ")) {
        res.push({
          type: "solution",
          text: splited_answer[i].split("Solution ")[1],
        });
      } else if (splited_answer[i].includes("Detailed Description : ")) {
        res.push({
          type: "desc",
          text: splited_answer[i].split("Detailed Description : ")[1],
        });
      } else if (splited_answer[i].includes("Service or Site : ")) {
        let service = "";
        if (
          splited_answer[i + 1] &&
          !splited_answer[i + 1].includes("Solution ")
        )
          service += splited_answer[i + 1];
        if (
          splited_answer[i + 2] &&
          !splited_answer[i + 2].includes("Solution ")
        ) {
          service += "<br />";
          service += splited_answer[i + 2];
        }
        res.push({
          type: "service",
          text: splited_answer[i].split("Service or Site : ")[1],
        });
      }
    }
    setGreeting(
      greetings[getRandomInt(0, 19)] +
        "<br />" +
        "<br />" +
        " I think the main cause of your problem is " +
        splited_answer[0].split("Main cause of this problem : ")[1]
    );
    console.log(res);
    setResponses(res);
  }, []);

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const callApi = async () => {
    console.log("요청 보내기");

    const body = {
      type: "chat",
      query: text,
      problem: question,
    };

    const response = await axios.post("/chat", body, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const output = await response;
    console.log("API 결과", output.data[0]);
    return output.data;
    // return "answer";
  };

  const submitChat = async (text: string) => {
    console.log("채팅을 보낸다.", text);
    if (text.length < 2) return;
    if (chats && chats.length > 5) return;
    if (loading) return;

    setLoading(true);

    if (chats)
      setChats([
        ...chats,
        {
          type: ChatType.client,
          text: text,
        },
        {
          type: ChatType.bot,
          text: "typing..",
        },
      ]);
    else
      setChats([
        {
          type: ChatType.client,
          text: text,
        },
        {
          type: ChatType.bot,
          text: "typing..",
        },
      ]);

    const response = await callApi();

    console.log("응답 체크", response);

    const body = {
      createdAt: new Date(),
      chat: text,
      answer: response,
      problem: question,
      uid: uid,
    };

    await dbService.collection("chat").add(body);

    if (chats)
      setChats([
        ...chats,
        {
          type: ChatType.client,
          text: text,
        },
        {
          type: ChatType.bot,
          text: response.split(":")[1].replace("[Your Name]", "Solomon"),
        },
      ]);
    else
      setChats([
        {
          type: ChatType.client,
          text: text,
        },
        {
          type: ChatType.bot,
          text: response.split(":")[1].replace("[Your Name]", "Solomon"),
        },
      ]);

    setText("");
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Solomon Answer</title>
        <meta name="description" content="Solomon will give you solution" />
        <link rel="icon" href="/card.png" />
      </Head>
      <AnswerContainer>
        <ProblemBox>
          <p className="label">Problem what you shared with us :</p>
          <p>{question}</p>
        </ProblemBox>

        <ImageWrapper>
          <Image src="/king.png" alt="we" width={55} height={55} />
        </ImageWrapper>
        <ResponseBox>
          <span className="tail"></span>
          <p
            className="greeting"
            dangerouslySetInnerHTML={{
              __html: greeting,
            }}></p>
          {responses.map((item, i) => {
            return (
              <Response key={i}>
                {item.type === "solution" && (
                  <div className="solution">
                    <span>Solution </span>
                    {item.text}
                  </div>
                )}
                {item.type === "desc" && (
                  <div className="desc">
                    <p className="label">Description</p>
                    {item.text}
                  </div>
                )}
                {item.type === "service" && (
                  <p className="link">
                    <span>Service or Site : </span>
                    {item.text}
                  </p>
                )}
              </Response>
            );
          })}
        </ResponseBox>
        <FeedbackBox onClick={() => onOpen()}>
          <ChatIcon />
          <p>Also We need your help. </p>
        </FeedbackBox>
        <br />
        {chats?.map((item, i) => {
          if (item.type === ChatType.client) {
            return (
              <ChatBubble key={i}>
                <div>{item.text}</div>
              </ChatBubble>
            );
          } else {
            return (
              <ChatBubble left key={i}>
                <div>
                  <Image src="/king.png" alt="we" width={20} height={15} />
                  <span>{item.text}</span>
                </div>
              </ChatBubble>
            );
          }
        })}

        <InputWrapperFixed
          onSubmit={(e: any) => {
            submitChat(text);
            e.preventDefault();
          }}>
          <CustomInput
            isDisabled={chats && chats.length > 5 ? true : false}
            placeholder="You can say thank you to the solomon or any other feedback!"
            p="24px 15px"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
          <span className="icon" onClick={(e) => submitChat(text)}>
            <ArrowForwardIcon color="whiteAlpha.800" />
          </span>
        </InputWrapperFixed>
        <CustomButton
          onClick={(e) => {
            router.push({
              pathname: "/",
              // query: { isFromHome: true, text: value },
            });
          }}>
          Go Back to tell more problem!
        </CustomButton>
        <FeedbackModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          problem={question}
        />
        {/*   <Input value={text} onChange={(e) => setText(e.currentTarget.value)} /> */}
      </AnswerContainer>
    </>
  );
};

export default Answer;

const CustomInput = styled(Input)`
  border: 2px solid rgba(0, 0, 0, 0.6);
  background: ${({ theme }) => theme.bgColor};

  &:hover {
    border: 2px solid rgba(0, 0, 0, 0.6);
  }
  &:focus {
    border: 2px solid rgba(0, 0, 0, 0.9);
  }
`;

const InputWrapperFixed = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 50px;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: ${({ theme }) => theme.purple03};
    width: 32px;
    height: 32px;
    border-radius: 50px;
    z-index: 1;
    cursor: pointer;
  }
`;
const AnswerContainer = styled.div`
  padding: 30px 30px 50px 30px;
  color: ${({ theme }) => theme.color};
`;

const Response = styled.div`
  display: flex;
  flex-direction: column;

  .solution {
    border-radius: 8px;
    padding: 8px 10px;
    margin-top: 15px;
    font-weight: 700;

    span{
      color${({ theme }) => theme.blue02};
    }
  }

  .desc {
    padding: 5px 10px;
  }

  .link{
    padding: 5px 10px;

  }

  .label {
    padding-right: 7px;
    font-weight: 700;
  }
`;

const ProblemBox = styled.div`
  padding: 12px 18px;
  border-radius: 8px;
  background: ${({ theme }) => theme.bgColor01 + "f1"};
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-weight: 600;

  p {
    font-size: 17px;
    padding: 5px 0px;
  }

  .label {
    color: ${({ theme }) => theme.blue01};
    margin-bottom: 2px;
    font-size: 15px;
    padding: 0px;
  }
`;

const ResponseBox = styled.div`
  padding: 12px;
  padding-top: 25px;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.darkGrey};
  background: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.color};
  font-size: 16px;
  max-width: 90%;
  margin-top: 20px;
  position: relative;
  z-index: 2;

  .greeting {
    padding: 0px 12px;
    margin-bottom: 10px;
    font-size: 1.1em;
  }

  .tail {
    z-index: 1;
    background: ${({ theme }) => theme.grey};
    width: 25px;
    height: 25px;
    position: absolute;
    transform: rotate(45deg);
    top: -5px;
    left: 25px;
  }
  @media (max-width: 420px) {
    max-width: 98%;
    font-size: 14px;
  }
`;

const ImageWrapper = styled.div`
  margin-top: 30px;
  padding: 10px;
  border-radius: 50px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.grey};
  box-shadow: 4px 4px 15px rgba(0, 0, 20, 0.3);
`;

const FeedbackBox = styled.div`
  align-items: center;
  display: flex;
  max-width: 90%;
  margin-top: 12px;
  padding: 12px;
  border-radius: 8px;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.grey + "bb"};
  outline: 2px solid ${({ theme }) => theme.darkGrey + "44"};
  cursor: pointer;

  &:hover {
    border: 1px solid ${({ theme }) => theme.darkGrey + "44"};
  }

  p {
    margin-left: 10px;
  }
  @media (max-width: 700px) {
    max-width: 95%;
  }
`;

const ChatBubble = styled.div<{ left?: boolean }>`
  width: 100%;
  display: flex;
  margin-top: 12px;
  justify-content: ${({ left }) => (left ? "flex-start" : "flex-end")};

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    border-radius: 8px;
    border-bottom-right-radius: ${({ left }) => (left ? "8px" : "0px")};
    border-bottom-left-radius: ${({ left }) => (left ? "0px" : "8px")};
    color: ${({ theme }) => theme.color};
    background: ${({ theme }) => theme.grey};
    max-width: 90%;

    span {
      margin-left: 8px;
    }
  }
`;
