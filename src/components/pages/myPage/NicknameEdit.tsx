import styled from 'styled-components';
import { BasicInput } from '../../common/BasicInput';
import { BasicButton } from '../../common/BasicButton';
import { theme } from '../../../styles/theme';
import { useRecoilState } from 'recoil';
import { NickNameAtom } from '../../../store/auth';
import { useMutation } from '@tanstack/react-query';
import { editNickname } from '../../../api/member';
import { ConfirmModal } from '../../common/ConfirmModal';
import { useState } from 'react';
import type { AxiosError } from 'axios';
import type { ErrorResponse } from 'react-router-dom';

export const NicknameEdit = () => {
  const [nickname, setNickname] = useRecoilState(NickNameAtom);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (newNickname: string) => editNickname(newNickname),
    onSuccess: (data) => {
      setNickname(data.data.nickname);
      setError(null);
    },
    onError: (err) => {
      const axiosError = err as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        setError(axiosError.response.data.data.nickname);
      }
    },
  });

  const handleEditNickname = (newNickname: string) => {
    mutation.mutate(newNickname);
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <NicknameEditContainer>
        <p>현재 닉네임 : {nickname}</p>
        <BasicInput id="nickname" type="text" placeholder="변경할 닉네임을 입력하세요" />
        {error && <p className="err-message">{error}</p>}
        <br />
        <BasicButton
          type="button"
          $bgcolor={theme.colors.orange}
          onClick={() => setIsConfirmModalOpen(true)}
          $fontcolor="#fff"
        >
          변경하기
        </BasicButton>
      </NicknameEditContainer>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        handleOpen={setIsConfirmModalOpen}
        title="닉네임을 변경할까요?"
        description="이전에 작성된 게시물의 닉네임은 바뀌지 않아요."
        onAgree={() => {
          const newNickname = (document.getElementById('nickname') as HTMLInputElement).value;
          handleEditNickname(newNickname);
        }}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </>
  );
};

const NicknameEditContainer = styled.form`
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

  .err-message {
    color: red;
  }
`;
