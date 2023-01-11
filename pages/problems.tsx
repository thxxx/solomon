import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { dbService } from "../utils/fbase";
import styled from "@emotion/styled";

export type ProblemType = {
  uid: string;
  question: string;
  answer: string;
  createdAt: any;
};

const Problem: NextPage = () => {
  const [problems, setProblems] = useState<ProblemType[]>([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    dbService
      .collection("problem")
      .get()
      .then((res) => {
        const response: ProblemType[] = res.docs.map((doc) => {
          return { ...(doc.data() as ProblemType), id: doc.id };
        });
        setProblems(response);
      });
  };

  return (
    <div>
      <div>Problem</div>
      <div>
        {problems.map((item, i) => {
          return (
            <ProblemWrapper key={i}>
              <div>{item.question}</div>
              <div>{item.answer}</div>
            </ProblemWrapper>
          );
        })}
      </div>
    </div>
  );
};

export default Problem;

const ProblemWrapper = styled.div`
  padding: 15px;
  background: rgba(230, 230, 255, 0.5);
  margin: 10px;
`;
