import { useNavigate } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SideBar } from '../common/SideBar';
import { useEffect, useState } from 'react';
import { BasicButton } from '../common/BasicButton';
import { currentCategoryAtom } from '../../store/menu';
import { TbBellFilled } from 'react-icons/tb';
import { ACCESS_TOKEN_KEY, USER_NICKNAME_KEY, USER_STATUS_KEY } from '../../constants/api';
import { AuthStateAtom, NickNameAtom } from '../../store/auth';
import { device } from '../../styles/media';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants/queryKey';
import { fetchLogOut } from '../../api/auth';
import { notification } from '../../api/notification';
import type { NotificationData } from '../../types/notification';
import { SearchAtom } from '../../store/search';

export const Header = () => {
  const [sideBar, setSideBar] = useState(false);
  const [searchQuery, setSearchQuery] = useRecoilState(SearchAtom);

  const navigation = useNavigate();

  const setCurrentCategory = useSetRecoilState(currentCategoryAtom);
  const [userNickName, setUserNickName] = useRecoilState(NickNameAtom);
  const [authState, setAuthState] = useRecoilState(AuthStateAtom);
  const [isLogOut, setIsLogOut] = useState(false);
  const [leftNotic, setLeftNotic] = useState([]);

  const isLogin = !!sessionStorage.getItem(ACCESS_TOKEN_KEY);

  const { data } = useQuery({
    queryKey: [QUERY_KEY.LOGOUT],
    queryFn: fetchLogOut,
    enabled: isLogOut,
    staleTime: 0,
  });

  const notic = useQuery({
    queryKey: [QUERY_KEY.NOTIFICATION],
    queryFn: notification,
    select: (data) => data.data.content,
    staleTime: 2000,
    enabled: isLogin,
  });

  useEffect(() => {
    const leftNoticCount = () => {
      return notic.data?.filter((item: NotificationData) => item.checkedAt === null);
    };

    setLeftNotic(leftNoticCount());
  }, [notic.data]);

  const handleLogin = () => {
    navigation('/signin');
    setCurrentCategory('');
  };

  const handleLogOut = () => {
    setIsLogOut(true);
    navigation('/');

    setAuthState(false);
    setUserNickName('');
    // eslint-disable-next-line no-alert
    alert('로그아웃 되었습니다.');
  };

  if (data && isLogOut) {
    setIsLogOut(false);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(USER_STATUS_KEY);
    sessionStorage.removeItem(USER_NICKNAME_KEY);

    document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  return (
    <Container>
      <Wrapper>
        <SearchInput
          onClick={() => navigation('/search')}
          type="text"
          placeholder="레시피를 검색해 보세요!"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></SearchInput>
        {userNickName !== '' && (
          <Nickname>
            <StyledLink to="/mypage">
              <span>{`${userNickName}님`}</span>
            </StyledLink>
          </Nickname>
        )}
        {userNickName !== '' ? (
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
            <NoticWrapper>
              {leftNotic?.length !== 0 && (
                <NoticNumber>
                  <p>{leftNotic?.length}</p>
                </NoticNumber>
              )}
              <TbBellFilled onClick={() => setSideBar(true)} />
            </NoticWrapper>
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

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  outline: none;
  padding-left: 10px;
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

const NoticWrapper = styled.div`
  position: relative;
`;

const NoticNumber = styled.div`
  position: absolute;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background-color: red;
  font-size: 13px;
  text-align: center;
  color: ${(props) => props.theme.colors.white};

  right: -3px;

  p {
    margin-top: 1px;
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
