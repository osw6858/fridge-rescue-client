import styled from 'styled-components';
import { MYPAGE_MENU } from '../constants/menu';
import { useState } from 'react';
import { NicknameEdit } from '../components/pages/myPage/NicknameEdit';
import { PasswordEdit } from '../components/pages/myPage/PasswordEdit';
import { PushList } from '../components/pages/myPage/PushList';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { EmailAuth } from '../components/pages/myPage/EmailAuth';

export const MyPage = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<(typeof MYPAGE_MENU)[number]>(MYPAGE_MENU[0]);

  const handleMenu = (menu: (typeof MYPAGE_MENU)[number]) => {
    setSelectedMenu(menu);
    if (menu === '로그아웃') {
      setLogoutModal(true);
    }
  };

  const renderSelectedComponent = () => {
    switch (selectedMenu) {
      case '알림 내역':
        return <PushList />;
      case '닉네임 변경':
        return <NicknameEdit />;
      case '비밀번호 변경':
        return <PasswordEdit />;
      case '이메일 인증':
        return <EmailAuth />;
      default:
        return null;
    }
  };

  return (
    <>
      <MyPageContainer>
        <MyPageMenu>
          {MYPAGE_MENU.map((menu) => {
            return (
              <div
                key={menu}
                className={selectedMenu === menu ? 'selected-menu' : ''}
                onClick={() => handleMenu(menu)}
                role="button"
              >
                {menu}
              </div>
            );
          })}
        </MyPageMenu>
        <h2>{selectedMenu !== '로그아웃' && selectedMenu}</h2>
        {renderSelectedComponent()}
        {logoutModal && (
          <ConfirmModal
            handleOpen={setLogoutModal}
            isOpen={logoutModal}
            title="로그아웃 할까요?"
            description="메인페이지로 돌아갑니다."
          />
        )}
      </MyPageContainer>
    </>
  );
};

const MyPageContainer = styled.div`
  h2 {
    text-align: center;
    font-size: 21px;
    font-weight: 900;
    padding: 48px 0;
  }
`;

const MyPageMenu = styled.div`
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  gap: 12px;

  & > div {
    border-radius: 8px;
    background-color: ${(props) => props.theme.colors.lightGray};
    padding: 16px;
    cursor: pointer;
    user-select: none;
  }

  .selected-menu {
    background-color: ${(props) => props.theme.colors.yellow};
    color: ${(props) => props.theme.colors.white};
  }
`;
