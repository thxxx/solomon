import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import styled from "@emotion/styled";
// import { useChatStore } from "../utils/store";
import { ThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  // const { darkMode } = useChatStore();
  const theme = false ? darkTheme : lightTheme;

  return (
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <MobileContainer>
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
  width: 100%;
  background: ${({ theme }) => theme.bgColor};
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Pretendard;

  .inner {
    width: 900px;
    min-height: 100vh;

    @media (max-width: 900px) {
      width: 100%;
    }
  }
`;
