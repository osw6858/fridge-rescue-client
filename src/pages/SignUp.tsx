import styled from 'styled-components';
import logo from '../assets/logo.png';
import { BasicInput } from '../components/common/BasicInput';
import { BasicButton } from '../components/common/BasicButton';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '../api/auth';

export const SignUp = () => {
  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => console.log('성공'),
    onError: (error) => console.error(error),
  });

  const handleSingUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      mail: { value: string };
      pw: { value: string };
      pwconfirm: { value: string };
      nickname: { value: string };
    };
    const params = {
      name: '저에요',
      nickname: target.nickname.value,
      email: target.mail.value,
      password: target.pw.value,
    };

    console.log(params);

    mutate(params);
  };

  return (
    <SignUpContainer>
      <img src={logo} alt="logo" className="logo-image" />
      <form onSubmit={(e) => handleSingUp(e)}>
        <div className="inputs">
          <label htmlFor="mail">이메일</label>
          <BasicInput id="mail" type="email" placeholder="이메일을 입력해 주세요" />
          <label htmlFor="pw">비밀번호</label>
          <BasicInput id="pw" type="password" placeholder="비밀번호를 입력해 주세요" />
          <label htmlFor="pwconfirm">비밀번호 확인</label>
          <BasicInput
            id="pwconfirm"
            type="password"
            placeholder="비밀번호를 한번 더 입력해 주세요"
          />
          <label htmlFor="nickname">닉네임</label>
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
