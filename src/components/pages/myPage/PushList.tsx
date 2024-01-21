/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { QUERY_KEY } from '../../../constants/queryKey';
import { notification } from '../../../api/notification';
import type { NotificationData } from '../../../types/notification';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useNotification } from '../../../hooks/useNotification';

export const PushList = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.NOTIFICATION],
    queryFn: notification,
    select: (data) => data.data.content,
  });

  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  const now = dayjs();

  const { handleRead } = useNotification({ data });

  // TODO : 데이터 연동 후 map 돌리기
  return (
    <PushListContainer>
      {data?.map((item: NotificationData) => (
        <div
          key={item.id}
          onClick={() =>
            handleRead(
              item.id,
              item.notificationType,
              item.notificationProperty.originId,
              item.checkedAt
            )
          }
        >
          <div>
            <span className="time">{dayjs(item.createdAt).from(now)}</span>
            <p>{item.notificationProperty.contents}</p>
          </div>
          <div className="delete-btn">
            {item.checkedAt && <span>{dayjs(item.checkedAt).from(now)}에 읽음</span>}
          </div>
        </div>
      ))}
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
    cursor: pointer;
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
    transition: all 0.3s;
    font-size: 14px;
    color: ${(props) => props.theme.colors.blue};
  }
`;
