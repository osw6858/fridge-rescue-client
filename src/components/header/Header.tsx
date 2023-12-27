import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SideBar } from '../common/SideBar';
import { useState } from 'react';
import { BasicInput } from '../common/BasicInput';
import { BasicButton } from '../common/BasicButton';

export const Header = () => {
  const [sidBar, setSidBar] = useState(false);

  return (
    <Container>
      <Wrapper>
        {/** TODO: 이곳에다 공통 Input컴포넌트 추가 / 아래는 임시 input */}
        <BasicInput id="text" type="email" placeholder="재료, 레시피를 검색해 주세요." />
        <StyledLink to="/signin">
          <BasicButton type="button" bgcolor="#FF8527" fontcolor="#fff" hoverbgcolor="#ff750c">
            로그인
          </BasicButton>
        </StyledLink>
        <StyledSvg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-bell"
          viewBox="0 0 16 16"
          onClick={() => setSidBar(true)}
        >
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
        </StyledSvg>
      </Wrapper>
      {sidBar && <SideBar isOpen={sidBar} handleSidbar={() => setSidBar(false)} />}
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
  display: grid;
  grid-template-columns: 70% 1fr 1fr;
  gap: 12px;
  width: 768px;
  margin: 0 auto;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const StyledSvg = styled.svg`
  min-width: 25px;
  min-height: 25px;
  transition: all 0.3s;
  fill: currentColor;
  margin: 10px 0 0 5px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
`;
