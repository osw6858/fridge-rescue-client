import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
      font-family: 'Pretendard-SemiBold';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff') format('woff');
      font-weight: 600;
      font-style: normal;
  }

  @font-face {
      font-family: 'Pretendard-Bold';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
      font-weight: 700;
      font-style: normal;
  }

  @font-face {
      font-family: 'Pretendard-ExtraBold';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-ExtraBold.woff') format('woff');
      font-weight: 900;
      font-style: normal;
  }


*, *::before, *::after {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    font-family: 'Pretendard-Regular', sans-serif;
}
    
  a:link, a:visited, a:hover, a:active {
    text-decoration: none;
    color: inherit;
  }

  button {
      border: 0;
      background: transparent;
      cursor: pointer;
  }

table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;
