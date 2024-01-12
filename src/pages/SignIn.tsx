import styled from 'styled-components';
import logo from '../assets/logo.png';
import { BasicInput } from '../components/common/BasicInput';
import { BasicButton } from '../components/common/BasicButton';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { fetchSignIn } from '../api/auth';
import type { AxiosError } from 'axios';
import { ACCESS_TOKEN_KEY, USER_NICKNAME_KEY, USER_STATUS_KEY } from '../constants/api';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { AuthStateAtom, NickNameAtom } from '../store/auth';

interface InputData {
  email?: string;
  pw?: string;
}

interface SignInProps {
  data: {
    id: number;
    nickname: string;
    roleType: string;
  };
  token: string;
  refreshToken: string;
}

interface ErrorData {
  code: number;
  error: string;
}

export const SignIn = () => {
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState('');
  const setAuthState = useSetRecoilState(AuthStateAtom);
  const setUserNickName = useSetRecoilState(NickNameAtom);

  const setTokenAndRefreshToken = (rowToken: string, rowRefresh: string) => {
    const token = rowToken.replace('Bearer', '');
    const refreshToken = rowRefresh.replace('Bearer', '');

    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    document.cookie = `refreshToken=${refreshToken}; path=/; max-age=2592000; samesite=strict`;
  };

  const signInSuccess = (res: SignInProps) => {
    const { token, refreshToken, data } = res;
    setTokenAndRefreshToken(token, refreshToken);

    sessionStorage.setItem(USER_STATUS_KEY, data.roleType);
    sessionStorage.setItem(USER_NICKNAME_KEY, data.nickname);

    setAuthState(true);
    setUserNickName(data.nickname);
    navigate('/');
  };

  const signInError = (errors: AxiosError) => {
    const res = errors.response?.data as ErrorData;
    const { error } = res;

    setErrorMsg(error);
  };

  const signUpMutation = useMutation({
    mutationFn: fetchSignIn,
    onSuccess: signInSuccess,
    onError: signInError,
  });

  const handleSignIn = (signInData: InputData) => {
    const params = {
      email: signInData.email as string,
      password: signInData.pw as string,
    };

    signUpMutation.mutate(params);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSignIn;

  return (
    <SignInContainer>
      <img src={logo} alt="logo" className="logo-image" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs">
          <div>
            <label htmlFor="mail">이메일</label>
            {errors.email && <ErrorMessage>이메일 입력은 필수 입니다.</ErrorMessage>}
          </div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: '이메일을 입력해 주세요.' }}
            render={({ field }) => (
              <BasicInput id="mail" type="email" placeholder="이메일을 입력해 주세요." {...field} />
            )}
          />
          <div>
            <label htmlFor="pw">비밀번호</label>
            {errors.pw && <ErrorMessage>비밀번호 입력은 필수 입니다.</ErrorMessage>}
          </div>
          <Controller
            name="pw"
            control={control}
            defaultValue=""
            rules={{ required: '비밀번호를 입력해 주세요.' }}
            render={({ field }) => (
              <BasicInput
                id="pw"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                {...field}
              />
            )}
          />
        </div>
        <div className="buttons">
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
          <BasicButton
            type="submit"
            $bgcolor={theme.colors.orange}
            $fontcolor={theme.colors.white}
            $hoverbgcolor="#ff750c"
          >
            이메일 로그인
          </BasicButton>
          <div className="line-text">간편 로그인</div>
          <BasicButton
            type="button"
            $bgcolor={theme.colors.white}
            $hoverbgcolor="#ececec"
            $bordercolor="#c0c0c0"
          >
            <div className="icon-button">
              <FcGoogle />
              구글 계정으로 로그인
            </div>
          </BasicButton>
        </div>
        <Link to="/signup">
          <span className="sign-up">아직 회원이 아니신가요?</span>
        </Link>
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

const ErrorMessage = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: red;
  margin-left: 5px;
`;
