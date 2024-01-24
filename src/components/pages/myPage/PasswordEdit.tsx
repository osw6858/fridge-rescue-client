import styled from 'styled-components';
import { BasicInput } from '../../common/BasicInput';
import { BasicButton } from '../../common/BasicButton';
import { theme } from '../../../styles/theme';
import { useState } from 'react';
import { ConfirmModal } from '../../common/ConfirmModal';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import type { PasswordFormData } from '../../../types/memberType';
import { editPassword } from '../../../api/member';
import type { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

export const PasswordEdit = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<PasswordFormData>();

  const mutation = useMutation({
    mutationFn: (passwordInfo: PasswordFormData) => editPassword(passwordInfo),
    onError: (err) => {
      const axiosError = err as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        setError(axiosError.response.data.message);
        reset();
      }
    },
    onSuccess: (data) => {
      // eslint-disable-next-line no-alert
      alert(data.message);
      setError(null);
      reset();
    },
  });

  const onSubmit = () => {
    setIsConfirmModalOpen(true);
  };

  const onAgree = (data: PasswordFormData) => {
    mutation.mutate(data);
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <PasswordEditContainer onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="current-password">현재 비밀번호</label>
        <Controller
          name="currentPassword"
          control={control}
          defaultValue=""
          rules={{ required: '비밀번호를 입력해 주세요' }}
          render={({ field }) => (
            <BasicInput
              id="current-password"
              type="password"
              placeholder="현재 비밀번호를 입력하세요"
              {...field}
            />
          )}
        />
        {errors.currentPassword && <p className="error">{errors.currentPassword.message}</p>}

        <label htmlFor="edit-password">변경할 비밀번호</label>
        <Controller
          name="editPassword"
          control={control}
          defaultValue=""
          rules={{ required: '비밀번호를 입력해 주세요' }}
          render={({ field }) => (
            <BasicInput
              id="edit-password"
              type="password"
              placeholder="변경할 비밀번호를 입력하세요"
              {...field}
            />
          )}
        />
        {errors.editPassword && <p className="error">{errors.editPassword.message}</p>}

        <label htmlFor="edit-password-confirm">변경할 비밀번호 확인</label>
        <Controller
          name="editPasswordConfirm"
          control={control}
          defaultValue=""
          rules={{
            required: '비밀번호를 한번 더 입력해 주세요',
            validate: (value) => value === watch('editPassword') || '비밀번호가 일치하지 않습니다',
          }}
          render={({ field }) => (
            <BasicInput
              id="edit-password-confirm"
              type="password"
              placeholder="변경할 비밀번호를 한번 더 입력하세요"
              {...field}
            />
          )}
        />
        {errors.editPasswordConfirm && (
          <p className="error">{errors.editPasswordConfirm.message}</p>
        )}

        {error && <p className="err-message">{error}</p>}

        <BasicButton $bgcolor={theme.colors.orange} type="submit" $fontcolor={theme.colors.white}>
          변경하기
        </BasicButton>
      </PasswordEditContainer>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        handleOpen={setIsConfirmModalOpen}
        title="비밀번호를 변경할까요?"
        onAgree={() => onAgree(watch())}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </>
  );
};

const PasswordEditContainer = styled.form`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;

  label {
    font-size: 13px;
  }

  .err-message,
  .error {
    color: red;
    font-size: 12px;
  }
`;
