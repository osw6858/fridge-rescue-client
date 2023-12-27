import styled from 'styled-components';
import { BasicInput } from '../../common/BasicInput';
import { BasicButton } from '../../common/BasicButton';

export const NicknameEdit = () => {
  return (
    <NicknameEditContainer>
      <p>현재 닉네임 : 띠띠</p>
      <BasicInput id="nickname" type="text" placeholder="변경할 닉네임을 입력하세요" />
      <p className="error">이미 존재하는 닉네임 입니다.</p>
      <br />
      <BasicButton bgcolor="#ff8527" type="text" fontcolor="#fff">
        변경하기
      </BasicButton>
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
