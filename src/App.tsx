import styled from 'styled-components';
import { PageLayout } from './components/layout/PageLayout';
import { Router } from './routes/Router';

export const App = () => {
  return (
    <AppContainer>
      <PageLayout>
        <Router />
      </PageLayout>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  background-color: ${(props) => props.theme.colors.grayishWhite};
  width: 100%;
  height: 100%;
`;
