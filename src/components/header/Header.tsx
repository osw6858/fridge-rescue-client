import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SideBar } from '../common/SideBar';
import { useState } from 'react';
import { BasicInput } from '../common/BasicInput';
import { BasicButton } from '../common/BasicButton';
import { currentCategoryAtom } from '../../store/menu';
import { TbBellFilled } from 'react-icons/tb';

export const Header = () => {
  const [sidBar, setSidBar] = useState(false);

  const navigation = useNavigate();
  const setCurrentCategory = useSetRecoilState(currentCategoryAtom);

  const handleLogin = () => {
    navigation('/signin');
    setCurrentCategory('');
  };

  return (
    <Container>
      <Wrapper>
        <BasicInput id="text" type="email" placeholder="레시피를 검색해 주세요." />
        <div>
          <BasicButton
            onClick={handleLogin}
            type="button"
            bgcolor="#FF8527"
            fontcolor="#fff"
            hoverbgcolor="#ff750c"
          >
            로그인
          </BasicButton>
        </div>
        <TbBellFilled />
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
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 12px;
  width: 768px;
  margin: 0 auto;

  input {
    width: 100%;
  }

  button {
    width: 100px;
  }

  svg {
    font-size: 28px;
    color: ${(props) => props.theme.colors.darkGray};
    cursor: pointer;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
