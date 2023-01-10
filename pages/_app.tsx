import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import styled from "@emotion/styled";
// import { useChatStore } from "../utils/store";
import { ThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "../styles/theme";
import { useStore } from "../utils/store";
import AppBar from "../components/AppBar";

function MyApp({ Component, pageProps }: AppProps) {
  const { darkMode } = useStore();
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <MobileContainer>
          <AppBar />
          <div className="backdrop" />
          <div className="inner">
            <Component {...pageProps} />
          </div>
        </MobileContainer>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default MyApp;

const MobileContainer = styled.div`
  background: url("grad.png");
  font-family: Pretendard;
  width: 100%;
  // background: ${({ theme }) => theme.bgColor};
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Pretendard;
  transition: 3s ease;

  .inner {
    width: 900px;
    min-height: 100vh;
    transition: 3s ease;
    z-index: 1;

    @media (max-width: 900px) {
      width: 100%;
    }
  }

  .backdrop {
    background: ${({ theme }) => theme.bgColor + "88"};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100vw;
    height: 100vh;
  }
`;
