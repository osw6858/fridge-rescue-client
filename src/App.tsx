import styled from 'styled-components';
import { Router } from './routes/router';

export const App: React.FC = () => {
  return (
    <div>
      <Test>Test</Test>
      <Router />
    </div>
  );
};

const Test = styled.div`
  font-size: 22px;
  color: ${(props) => props.theme.colors.red};
`;
