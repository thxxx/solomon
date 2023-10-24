import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, Input, Textarea, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { dbService } from '../utils/fbase'
import styled from '@emotion/styled'
import { ProblemType } from './problems'
import Link from 'next/link'
import router from 'next/router'
import { useStore } from '../utils/store'
import { v4 as uuidv4 } from 'uuid'
import { dummy } from '../utils/utters'
import Footer from '../components/Footer'
import AskModal from '../components/AskModal'
import axios from 'axios'
import HeadingSection from '../components/main/HeadingSection'

export const LOCAL_ID = 'solomon_uuid'

const Home: NextPage = () => {
  const [problem, setProblem] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [changed, setChanged] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setQuestion, setAnswer, setDarkMode, setUid, uid } = useStore()

  useEffect(() => {
    getUidAndSet()
    setDarkMode(false)
    setChanged(0)
  }, [])

  const getUidAndSet = () => {
    if (uid === 'anonymous') {
      let myuuid = localStorage.getItem(LOCAL_ID)
      if (myuuid) {
        setUid(myuuid)
      } else {
        myuuid = uuidv4()
        if (myuuid) {
          setUid(myuuid)
          localStorage.setItem(LOCAL_ID, myuuid)
        }
      }
    }
  }

  const callApi = async () => {
    console.log('문제 요청 보내기11')

    const body = {
      type: 'problem',
      query: problem,
    }

    const response = await axios.post('/chat', body, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })

    console.log('응답', response)
    const output = response
    // const output = await response.json();
    console.log('문제 API 결과', output.data)
    if (!output) return dummy
    return output.data
  }

  const sendProblem = async () => {
    const count = await localStorage.getItem('count')
    if (problem.length < 3) {
      alert('Please type')
      return
    }
    if (count && parseInt(count) > 4) {
      onOpen()
      return
    }

    setChanged(10)
    setLoading(true)

    // api로 보내서 응답을 받는다.
    const response = await callApi()

    const body: ProblemType = {
      createdAt: new Date(),
      question: problem,
      answer: response,
      uid: uid,
    }

    setAnswer(response)
    setQuestion(problem)

    await dbService.collection('problem').add(body)

    setLoading(false)
    setProblem('')

    if (count) await localStorage.setItem('count', String(parseInt(count) + 1))
    else await localStorage.setItem('count', '1')

    router.push({
      pathname: '/answer',
      // query: { isFromHome: true, text: value },
    })
  }

  return (
    <>
      <Head>
        <title>Challenge</title>
        <meta name='description' content='Coding Challenges' />
      </Head>
      <MainContainer>
        <HeadingSection />
      </MainContainer>
      <Footer />
    </>
  )
}

export default Home

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
`

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
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 700px;
  margin-top: 50px;
`

const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const CustomButton = styled(Button)`
  border: 2px solid black;
  border-bottom-width: 4px;
  border-right-width: 4px;
  padding: 20px;
  width: 100%;
  margin-top: 15px;
  // background-color: ${({ theme }) => theme.purple03};
  font-size: 1em;
`
