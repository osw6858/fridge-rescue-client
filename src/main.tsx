import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { RecoilRoot } from 'recoil';
import { queryClient } from './hooks/api/queryClient.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { Theme } from './styles/theme.ts';
import { GlobalStyle } from './styles/globalStyle.ts';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
