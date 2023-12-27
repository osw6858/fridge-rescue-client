import styled from 'styled-components';
import { BasicInput } from '../../common/BasicInput';
import { BasicButton } from '../../common/BasicButton';

export const PasswordEdit = () => {
  return (
    <PasswordEditContainer>
      <label htmlFor="current-password">현재 비밀번호</label>
      <BasicInput id="current-password" type="password" placeholder="현재 비밀번호를 입력하세요" />
      <label htmlFor="edit-password">변경할 비밀번호</label>
      <BasicInput id="edit-password" type="password" placeholder="변경할 비밀번호를 입력하세요" />
      <BasicInput
        id="edit-password-confirm"
        type="password"
        placeholder="변경할 비밀번호를 한번 더 입력하세요"
      />
      <BasicButton bgcolor="#ff8527" type="text" fontcolor="#fff">
        변경하기
      </BasicButton>
    </PasswordEditContainer>
  );
};

const PasswordEditContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;

  #nickname {
    width: 100%;
  }

  label {
    font-size: 13px;
  }

  .error {
    color: red;
    float: right;
  }
`;
