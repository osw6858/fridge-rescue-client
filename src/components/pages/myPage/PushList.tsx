import styled from 'styled-components';

export const PushList = () => {
  // TODO : 데이터 연동 후 map 돌리기
  return (
    <PushListContainer>
      <div>
        <div>
          <span className="time">10분전</span>
          <p>00님이 레시피를 추천했어요.</p>
        </div>
        <div className="delete-btn" role="button">
          삭제
        </div>
      </div>
      <div>
        <div>
          <span className="time">10분전</span>
          <p>00님이 레시피를 추천했어요.</p>
        </div>
        <div className="delete-btn" role="button">
          삭제
        </div>
      </div>
      <div>
        <div>
          <span className="time">10분전</span>
          <p>00님이 레시피를 추천했어요.</p>
        </div>
        <div className="delete-btn" role="button">
          삭제
        </div>
      </div>
    </PushListContainer>
  );
};

const PushListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  .time {
    font-size: 12px;
    color: ${(props) => props.theme.colors.darkGray};
  }

  & > div {
    background-color: ${(props) => props.theme.colors.sky}40;
    padding: 12px 16px;
    border-radius: 12px;

    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
  }

  .delete-btn {
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 14px;
    color: ${(props) => props.theme.colors.blue};

    &:hover {
      background-color: ${(props) => props.theme.colors.sky}50;
    }
  }
`;
