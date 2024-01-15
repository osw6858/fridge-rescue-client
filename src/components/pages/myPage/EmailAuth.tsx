import styled from 'styled-components';
import { BasicInput } from '../../common/BasicInput';
import { BasicButton } from '../../common/BasicButton';

export const EmailAuth = () => {
  return (
    <NicknameEditContainer>
      <BasicInput id="nickname" type="text" placeholder="이메일을 입력하세요" />
      <br />
      <BasicButton $bgcolor="#ff8527" type="text" $fontcolor="#fff">
        인증번호 발송
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
