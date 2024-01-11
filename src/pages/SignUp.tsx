import styled from 'styled-components';
import logo from '../assets/logo.png';
import { BasicInput } from '../components/common/BasicInput';
import { BasicButton } from '../components/common/BasicButton';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { fetchSignUp } from '../api/auth';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { useState } from 'react';
import type { AxiosError } from 'axios';

interface ErrorMsgData {
  email?: string;
  name?: string;
  nickname?: string;
  password?: string;
}

interface SignUpError {
  message: string;
  data: ErrorMsgData;
}

export const SignUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsgData, setErrorMsgData] = useState<ErrorMsgData>({});
  const [errorMsg, setErrorMsg] = useState('');

  const handleError = (error: AxiosError) => {
    const errorData = error.response?.data as SignUpError;
    // TODO: 스위치 케이스문으로 바꾸기
    console.log(errorData);
    if (errorData.message === '유효성 검사 실패') {
      setErrorMsgData(errorData.data);
    } else if (errorData.message === '이미 존재하는 이메일입니다.') {
      setErrorMsg(errorData.message);
    }
  };

  const { mutate } = useMutation({
    mutationFn: fetchSignUp,
    onSuccess: () => console.log('성공'),
    onError: handleError,
  });

  const handleSingUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    setErrorMsgData({});

    const target = e.target as typeof e.target & {
      mail: { value: string };
      pw: { value: string };
      pwconfirm: { value: string };
      nickname: { value: string };
    };
    const params = {
      name: 'ddd',
      nickname: target.nickname.value,
      email: target.mail.value,
      password: target.pw.value,
    };
    mutate(params);
    setIsOpen(true);
  };

  return (
    <SignUpContainer>
      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          handleOpen={setIsOpen}
          title="이메일 인증"
          description="로그인 후 이메일 인증을 마쳐야 서비스 이용이 가능합니다."
        />
      )}
      <img src={logo} alt="logo" className="logo-image" />
      <form onSubmit={(e) => handleSingUp(e)}>
        <div className="inputs">
          <div>
            <label htmlFor="mail">이메일</label>
            {errorMsgData && <ErrorMessage>{errorMsgData.email}</ErrorMessage>}
            {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
          </div>
          <BasicInput id="mail" type="email" placeholder="이메일을 입력해 주세요" />
          <div>
            <label htmlFor="pw">비밀번호</label>
            {errorMsgData && <ErrorMessage>{errorMsgData.password}</ErrorMessage>}
          </div>
          <BasicInput id="pw" type="password" placeholder="비밀번호를 입력해 주세요" />
          <label htmlFor="pwconfirm">비밀번호 확인</label>
          <BasicInput
            id="pwconfirm"
            type="password"
            placeholder="비밀번호를 한번 더 입력해 주세요"
          />
          <div>
            <label htmlFor="nickname">닉네임</label>
            {errorMsgData && <ErrorMessage>{errorMsgData.nickname}</ErrorMessage>}
          </div>
          <BasicInput id="nickname" type="text" placeholder="사용할 닉네임을 입력하세요" />
        </div>
        <BasicButton type="submit" $bgcolor="#FF8527" $fontcolor="#fff" $hoverbgcolor="#ff750c">
          회원 가입
        </BasicButton>
        <Link to="/signin">
          <span className="back">뒤로가기</span>
        </Link>
      </form>
    </SignUpContainer>
  );
};
const SignUpContainer = styled.div`
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
  }

  label {
    font-size: 12px;
  }

  .back {
    float: right;
    font-size: 12px;
    margin: 16px 0;
    cursor: pointer;
  }

  button {
    margin-top: 24px;
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: red;
  margin-left: 5px;
`;
