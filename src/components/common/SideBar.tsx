/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled, { keyframes } from 'styled-components';
import { useEffect } from 'react';
import { device } from '../../styles/media';
import { StyledLink } from '../header/Header';

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
        <p>알림</p>
        <NotificationList>
          {[1, 2, 3].map((_, index) => (
            <Wrapper>
              <StyledLink to="/recipe" key={index}>
                <Notification>
                  <Content>00님이 레시피를 추천했어요!</Content>
                  <Time>1분전</Time>
                </Notification>
              </StyledLink>
              <DeleteButtonWrapper>
                <p onClick={() => console.log('삭제')}>삭제</p>
              </DeleteButtonWrapper>
            </Wrapper>
          ))}
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
  font-size: 35px;
  font-weight: 700;
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

  @media ${device.mobile} {
    width: 200px;
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const NotificationList = styled.ul`
  margin-top: 20px;
  display: grid;
  gap: 10px;
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

  @media ${device.mobile} {
    font-size: 13px;
  }
`;

const Time = styled.span`
  padding-left: 10px;
  margin-top: 10px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.darkGray};
`;

const DeleteButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;

  bottom: 15px;
  right: 2px;

  & > p {
    margin-right: 15px;
    font-size: 13px;
    color: ${(props) => props.theme.colors.darkGray};
    cursor: pointer;
  }
`;
