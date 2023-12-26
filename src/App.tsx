import styled from 'styled-components';
import { PageLayout } from './components/layout/PageLayout';
import { Router } from './routes/Router';
import { NavBar } from './components/navbar/NavBar';
import { Header } from './components/layout/header/Header';

export const App = () => {
  return (
    <AppContainer>
      <Header />
      <PageLayout>
        <Router />
      </PageLayout>
      <NavBar />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  background-color: ${(props) => props.theme.colors.grayishWhite};
  width: 100%;
  height: 100%;
`;
