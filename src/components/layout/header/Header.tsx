import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <Container>
      <Wrapper>
        {/** TODO: 이곳에다 공통 Input컴포넌트 추가 / 아래는 임시 input */}
        <TempInput type="text" />
        <StyledLink to="/signin">
          <LoginButton>로그인</LoginButton>
        </StyledLink>
      </Wrapper>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  z-index: 10;
  position: fixed;
  background-color: ${(props) => props.theme.colors.white};
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 768px;
  margin: 0 auto;
`;

const TempInput = styled.input`
  width: 70%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const LoginButton = styled.button`
  background-color: ${(props) => props.theme.colors.orange};
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  height: 40px;
  border: none;
  border-radius: 10px;
  padding: 0 15px 0 15px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }
`;
