// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log("api 호출");
  let i = 0;
  setInterval(() => {
    console.log("체ㅋ", i);
    i += 1;
  }, 1000);

  const response = await axios.post(
    "https://b9zm4cxhn1.execute-api.us-west-2.amazonaws.com/v1/chat",
    req.body
  );
  console.log("api 응답", response);

  res.status(200).json({ data: response.data });
}
