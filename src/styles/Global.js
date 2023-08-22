import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

#root, body, html{
  width:100%;
    height: 100vh;
    margin: 0 auto;
}

* {
  font-family: 'Pretendard-Regular';
  box-sizing: border-box;
}
`;