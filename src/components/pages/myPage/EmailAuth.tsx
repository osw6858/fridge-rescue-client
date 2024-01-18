/* eslint-disable no-console */
/* eslint-disable no-alert */
import styled from 'styled-components';
import { BasicInput } from '../../common/BasicInput';
import { BasicButton } from '../../common/BasicButton';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { emailAuthInMyPage } from '../../../api/auth';
import { axiosAuth } from '../../../api/axiosInstance';
import { END_POINTS, USER_STATUS_KEY } from '../../../constants/api';
import type { AxiosError } from 'axios';

export const EmailAuth = () => {
  const [authCode, setAuthCode] = useState<string | undefined>('');

  const { mutate } = useMutation({
    mutationFn: emailAuthInMyPage,
    onSuccess: (data) => {
      alert('이메일 인증이 완료 되었습니다.');
      sessionStorage.setItem(USER_STATUS_KEY, data.data.role);
    },
    onError: (error: AxiosError) => {
      console.error(error);
    },
  });

  const handleSendAuthCode = () => {
    if (!authCode) {
      // eslint-disable-next-line no-alert
      alert('인증번호를 입력해 주세요!');
      return;
    }
    const finalData = {
      code: authCode,
    };
    mutate(finalData);
    setAuthCode('');
  };

  const leave = async () => {
    const { data } = await axiosAuth.delete(END_POINTS.LEAVE);
    console.log(data);
  };

  return (
    <NicknameEditContainer>
      <BasicInput
        value={authCode}
        onChange={(e) => setAuthCode(e?.target.value)}
        id="nickname"
        type="text"
        placeholder="이메일로 도착한 인증 코드를 입력해 주세요."
      />
      <br />
      <BasicButton onClick={handleSendAuthCode} $bgcolor="#ff8527" type="text" $fontcolor="#fff">
        인증 확인
      </BasicButton>
      <button type="button" onClick={leave}>
        탈퇴
      </button>
    </NicknameEditContainer>
  );
};

const NicknameEditContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  #nickname {
    width: 100%;
  }

  p {
    font-size: 13px;
    padding: 6px 0;
  }

  .error {
    color: red;
    float: right;
  }
`;
