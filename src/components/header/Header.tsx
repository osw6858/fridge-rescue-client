import { useNavigate } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SideBar } from '../common/SideBar';
import { useState } from 'react';
import { BasicInput } from '../common/BasicInput';
import { BasicButton } from '../common/BasicButton';
import { currentCategoryAtom } from '../../store/menu';
import { TbBellFilled } from 'react-icons/tb';
import { ACCESS_TOKEN_KEY, USER_NICKNAME_KEY, USER_STATUS_KEY } from '../../constants/api';
import { AuthStateAtom, NickNameAtom } from '../../store/auth';
import { device } from '../../styles/media';

export const Header = () => {
  const [sideBar, setSideBar] = useState(false);

  const navigation = useNavigate();

  const setCurrentCategory = useSetRecoilState(currentCategoryAtom);
  const [userNickName, setUserNickName] = useRecoilState(NickNameAtom);
  const [authState, setAuthState] = useRecoilState(AuthStateAtom);

  const handleLogin = () => {
    navigation('/signin');
    setCurrentCategory('');
  };

  const handleLogOut = () => {
    navigation('/');

    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(USER_STATUS_KEY);
    sessionStorage.removeItem(USER_NICKNAME_KEY);

    document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setAuthState(false);
    setUserNickName('');
    // eslint-disable-next-line no-alert
    alert('로그아웃 되었습니다.');
  };

  return (
    <Container>
      <Wrapper>
        <BasicInput id="text" type="email" placeholder="레시피를 검색해 주세요." />
        {userNickName && (
          <Nickname>
            <StyledLink to="/mypage">
              <span>{`${userNickName}님`}</span>
            </StyledLink>
          </Nickname>
        )}
        {authState ? (
          <>
            <BasicButton
              onClick={handleLogOut}
              type="button"
              $bgcolor="#FF8527"
              $fontcolor="#fff"
              $hoverbgcolor="#ff750c"
            >
              로그아웃
            </BasicButton>
            <TbBellFilled onClick={() => setSideBar(true)} />
          </>
        ) : (
          <BasicButton
            onClick={handleLogin}
            type="button"
            $bgcolor="#FF8527"
            $fontcolor="#fff"
            $hoverbgcolor="#ff750c"
          >
            로그인
          </BasicButton>
        )}
      </Wrapper>
      {sideBar && <SideBar isOpen={sideBar} handleSidebar={() => setSideBar(false)} />}
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
  grid-template-columns: 1fr auto auto auto;
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

  @media ${device.mobile} {
    padding: 10px;

    button {
      width: 70px;
    }
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Nickname = styled.p`
  font-size: 14px;

  bottom: -27px;
  left: 6px;
`;
