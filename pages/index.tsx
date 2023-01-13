import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button, Input, Textarea, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { dbService } from "../utils/fbase";
import styled from "@emotion/styled";
import { ProblemType } from "./problems";
import Link from "next/link";
import Examples from "./components/Examples";
import router from "next/router";
import { useStore } from "../utils/store";
import { v4 as uuidv4 } from "uuid";
import { dummy } from "../utils/utters";
import Footer from "../components/Footer";
import AskModal from "../components/AskModal";

export const LOCAL_ID = "solomon_uuid";

const Home: NextPage = () => {
  const [problem, setProblem] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [changed, setChanged] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setQuestion, setAnswer, setDarkMode, setUid, uid } = useStore();

  useEffect(() => {
    getUidAndSet();
    setDarkMode(false);
    setChanged(0);
  }, []);

  const getUidAndSet = () => {
    if (uid === "anonymous") {
      let myuuid = localStorage.getItem(LOCAL_ID);
      if (myuuid) {
        setUid(myuuid);
      } else {
        myuuid = uuidv4();
        if (myuuid) {
          setUid(myuuid);
          localStorage.setItem(LOCAL_ID, myuuid);
        }
      }
    }
  };

  const callApi = async () => {
    console.log("문제 요청 보내기");

    const body = {
      type: "problem",
      query: problem,
    };

    const response = await fetch("/api/hello", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const output = await response.json();
    console.log("문제 API 결과", output.data);
    if (!output) return dummy;
    return output.data;
  };

  const sendProblem = async () => {
    const count = await localStorage.getItem("count");
    if (problem.length < 3) {
      alert("Please type");
      return;
    }
    if (count && parseInt(count) > 4) {
      onOpen();
      return;
    }

    setChanged(10);
    setLoading(true);

    // api로 보내서 응답을 받는다.
    const response = await callApi();

    const body: ProblemType = {
      createdAt: new Date(),
      question: problem,
      answer: response,
      uid: uid,
    };

    setAnswer(response);
    setQuestion(problem);

    await dbService.collection("problem").add(body);

    setLoading(false);
    setProblem("");

    if (count) await localStorage.setItem("count", String(parseInt(count) + 1));
    else await localStorage.setItem("count", "1");

    router.push({
      pathname: "/answer",
      // query: { isFromHome: true, text: value },
    });
  };

  return (
    <>
      <Head>
        <title>Solomon</title>
        <meta name="description" content="Solomon will give you solution" />
        <link rel="icon" href="/card.png" />
      </Head>

      <MainContainer
        style={{
          paddingTop: `${(10 - changed) * 10 + 40}px`,
        }}>
        <Image
          src="/king.png"
          width={120 + changed * 6}
          height={120 + changed * 6}
          alt="king"
          style={{
            transition: "3s ease",
          }}
        />
        <h1
          style={{
            fontSize: `${(10 - changed) * 0.35}em`,
          }}>
          Let me help you <span>Solomon</span>
        </h1>
        <h2
          style={{
            fontSize: `${(10 - changed) * 0.13}em`,
            marginTop: `${2 * (10 - changed)}px`,
          }}>
          Please write down the problem you are experiencing in detail below.
          <br />
          Our AI, Solomon will make 4 solutions for you.
        </h2>

        <FormContainer
          onSubmit={(e) => {
            e.preventDefault();
            sendProblem();
          }}>
          <CustomTextarea
            placeholder="Ex. I want to keep up-to-date on the deep learning sector, but I don 't know where I can see it."
            value={problem}
            onChange={(e) => setProblem(e.currentTarget.value)}
          />
          <div
            style={{
              transition: "3s ease",
              height: `${changed * 5}vh`,
            }}>
            {loading && (
              <Center>
                <Image
                  src="/circle.gif"
                  alt="loading"
                  width={100}
                  height={100}
                />
              </Center>
            )}
          </div>
          <CustomButton isLoading={loading} onClick={() => sendProblem()}>
            Send My Problem and get answer by Solomon!
          </CustomButton>
          <Description>
            <p>
              I{"'"}m not a human being, I{"'"}m an <span>SMART AI</span>, so I
              can tell you an unexpected solution.
            </p>
            <p>
              The more detail you write, the better your solution comes out.
            </p>
            <br />
            <p>
              You can ask only 5 times for free.{" "}
              <strong>
                Because we use OpenAI{"'"}s most expensive GPT with our prompt
                engineering
              </strong>
            </p>
            <br />
            <p>
              <strong>Below are an examples</strong>
            </p>
          </Description>
        </FormContainer>
        <Examples />
      </MainContainer>
      <AskModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <Footer />
    </>
  );
};

export default Home;
export const CustomTextarea = styled(Textarea)`
  border: 2px solid rgba(0, 0, 0, 0.6);
  padding: 15px 10px;

  @media (max-width: 500px) {
    padding: 8px 10px;
    font-size: 14px;
  }
  resize: none;
  background: ${({ theme }) => theme.bgColor};

  &:hover {
    border: 2px solid rgba(0, 0, 0, 0.6);
  }
  &:focus {
    border: 2px solid rgba(0, 0, 0, 0.9);
  }
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background: ${({ theme }) => theme.bgColor};
  transition: 3s ease;
  min-height: 100vh;
  padding-bottom: 450px;

  h1 {
    font-weight: 700;
    text-align: center;
    opacity: 0.9;
    transition: 3s ease;

    span {
      color: ${({ theme }) => theme.blue02};
    }
  }

  h2 {
    text-align: center;
    transition: 3s ease;
  }

  @media (max-width: 420px) {
    font-size: 12px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 700px;
  margin-top: 50px;
`;

const Center = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
`;

export const CustomButton = styled(Button)`
  border: 2px solid black;
  border-bottom-width: 4px;
  border-right-width: 4px;
  padding: 20px;
  width: 100%;
  margin-top: 15px;
  // background-color: ${({ theme }) => theme.purple03};
  font-size: 1em;
`;

const Description = styled.div`
  margin-top: 40px;
  padding: 20px;
  // border-radius: 6px;
  line-height: 1.7em;
  background: ${({ theme }) => theme.bgColor + "44"};
  color: rgba(40, 40, 40, 0.8);
  width: 100%;
  text-align: center;
  outline: 3px solid rgba(250, 250, 250, 0.1);
  span {
    color: ${({ theme }) => theme.blue02};
  }
`;
