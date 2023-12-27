import styled, { keyframes } from 'styled-components';
import { useEffect } from 'react';
import { device } from '../../styles/media';

interface Props {
  handleSidbar: () => void;
  isOpen: boolean;
}

export const SideBar = ({ handleSidbar, isOpen }: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <Container onClick={handleSidbar}>
      <SideMenuWrapper
        style={{ transform: `translateX(${isOpen ? '0' : '-100%'})` }}
        onClick={(event) => event.stopPropagation()}
      >
        <SidbarTitle>알림</SidbarTitle>
        <NotificationList>
          <Notification>
            <Content>00님이 레시피를 추천했어요!</Content>
            <Time>1분전</Time>
            <DeleteButtonWrapper>
              <p>삭제</p>
            </DeleteButtonWrapper>
          </Notification>
        </NotificationList>
      </SideMenuWrapper>
    </Container>
  );
};

const SlideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const Container = styled.div`
  width: 100%;
  min-width: 360px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 200;
  top: 0;
`;

const SideMenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 450px;
  height: 100%;
  padding: 30px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  animation: ${SlideIn} 0.5s ease-in-out;

  & > ul {
    margin: 22px 22px 22px 10px;
    & > a {
      font-size: 1.6rem;
      margin: 20px 0 28px 22px;
    }
  }

  @media ${device.mobile} {
    width: 250px;
  }
`;

const SidbarTitle = styled.p`
  font-size: 35px;
  font-weight: 700;
`;

const NotificationList = styled.ul`
  display: grid;
  place-items: center;
`;

const Notification = styled.li`
  border: 2px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 10px;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.p`
  padding-left: 10px;
  font-weight: 600;
  font-size: 17px;
`;

const Time = styled.span`
  padding-left: 10px;
  margin-top: 10px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.darkGray};
`;

const DeleteButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  & > p {
    margin-right: 15px;
    font-size: 13px;
    color: ${(props) => props.theme.colors.darkGray};
  }
`;
