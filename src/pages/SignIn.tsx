import styled from 'styled-components';
import logo from '../assets/logo.png';
import { BasicInput } from '../components/common/BasicInput';
import { BasicButton } from '../components/common/BasicButton';
import { FcGoogle } from 'react-icons/fc';
import { HiMiniChatBubbleOvalLeft } from 'react-icons/hi2';

export const SignIn = () => {
  return (
    <SignInContainer>
      <img src={logo} alt="logo" className="logo-image" />
      <form>
        <div className="inputs">
          <label htmlFor="mail">이메일</label>
          <BasicInput id="mail" type="email" placeholder="이메일을 입력해 주세요" />
          <label htmlFor="pw">비밀번호</label>
          <BasicInput id="pw" type="password" placeholder="비밀번호를 입력해 주세요" />
        </div>
        <div className="buttons">
          <BasicButton type="submit" bgcolor="#FF8527" fontcolor="#fff" hoverbgcolor="#ff750c">
            이메일 로그인
          </BasicButton>

          <div className="line-text">간편 로그인</div>

          <BasicButton type="button" bgcolor="#fff" hoverbgcolor="#ececec" bordercolor="#c0c0c0">
            <div className="icon-button">
              <FcGoogle />
              구글 계정으로 로그인
            </div>
          </BasicButton>
          <BasicButton type="button" bgcolor="#FEE502" hoverbgcolor="#ffe100" bordercolor="#ffe100">
            <div className="icon-button">
              <HiMiniChatBubbleOvalLeft />
              카카오 로그인
            </div>
          </BasicButton>
        </div>
        <p className="sign-up">아직 회원이 아니신가요?</p>
      </form>
    </SignInContainer>
  );
};
const SignInContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  .logo-image {
    width: 200px;
    margin-bottom: 24px;
  }

  form {
    width: 60%;
    min-width: 300px;

    .inputs {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .buttons {
      & > button {
        margin-top: 12px;
      }
    }

    .icon-button {
      display: grid;
      grid-template-columns: 30px 1fr;
      justify-items: center;
      align-items: center;

      svg {
        font-size: 19px;
        margin-left: 62px;
      }
    }
  }

  label {
    font-size: 12px;
  }

  .line-text {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.gray};
    font-size: 14px;
    margin: 24px 0 12px 0;
    position: relative;

    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 0.5px;
      background-color: ${(props) => props.theme.colors.lightGray};
      margin: 0 8px;
    }
  }

  .sign-up {
    float: right;
    font-size: 12px;
    margin: 16px 0;
    cursor: pointer;
  }
`;
