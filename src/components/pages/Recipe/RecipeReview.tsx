import styled from 'styled-components';
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from 'react-icons/io';
import { useState } from 'react';
import { ImageModal } from '../../common/ImageModal';
import type { Review } from '../../../types/reviewType';
import { formatDate } from '../../../utils/formatDate';
import { MdModeEdit } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewDelete } from '../../../api/review';
import { QUERY_KEY } from '../../../constants/queryKey';
import { useNavigate } from 'react-router-dom';

export const RecipeReview = ({ reviewData }: { reviewData: Review }) => {
  const navigation = useNavigate();
  const [isImageModalOpened, setImageModalOpen] = useState(false);
  const [showAllContent, setShowAllContent] = useState(false);

  const handleImageModal = (isOpen: boolean) => {
    setImageModalOpen(isOpen);
  };

  const handleToggleContent = () => {
    setShowAllContent((prev) => !prev);
  };

  const QueryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => reviewDelete(reviewData.id),
    onSuccess: () =>
      QueryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_REVIEW],
      }),
  });

  const handleDelete = () => {
    /* eslint-disable no-alert */
    // eslint-disable-next-line no-restricted-globals
    if (confirm('정말 삭제할까요?')) {
      mutation.mutate();
    }
  };

  return (
    <>
      <RecipeReviewContainer $showAllContent={showAllContent}>
        <div className="buttons">
          <button
            type="button"
            onClick={() =>
              navigation('/review/edit', {
                state: {
                  reviewId: reviewData.id,
                },
              })
            }
          >
            <MdModeEdit />
          </button>
          <button type="button" onClick={handleDelete}>
            <RiDeleteBin5Fill />
          </button>
        </div>
        <div className="review-image" role="button" onClick={() => handleImageModal(true)}>
          <img src={reviewData.imageUrl} alt="리뷰 썸네일" />
        </div>
        <div className="description">
          <div className="title">{reviewData?.title}</div>
          <div className="review-info">
            <span>{formatDate(reviewData?.createdAt)}</span>
            <span>{reviewData?.author?.nickname}</span>
          </div>
          <div className="content">
            {reviewData.contents} 제가 더 잘만들죠?제가 더 잘만들죠?제가 더 잘만들죠?제가 더
            잘만들죠?제가 더 잘만들죠?제가 더 잘만들죠?제가 더 잘만들죠?제가 더 잘만들죠?제가 더
            잘만들죠?제가 더 잘만들죠?제가 더 잘만들죠?제가 더 잘만들죠?제가 더 잘만들죠?제가 더
            잘만들죠?제가 더 잘만들죠?제가 더 잘만들죠?제가 더 잘만들죠?제가 더 잘만들죠?
          </div>
          <div className="arrow" onClick={handleToggleContent} role="button">
            {showAllContent ? (
              <>
                <span>접기</span>
                <IoMdArrowRoundUp />
              </>
            ) : (
              <>
                <span>더보기</span>
                <IoMdArrowRoundDown />
              </>
            )}
          </div>
        </div>
      </RecipeReviewContainer>
      {isImageModalOpened && (
        <ImageModal imageUrl={reviewData.imageUrl} alt="음식" handleImageModal={handleImageModal} />
      )}
    </>
  );
};

const RecipeReviewContainer = styled.div<{ $showAllContent: boolean }>`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 24px;
  padding: 12px;
  background-color: ${(props) => props.theme.colors.grayishWhite};
  border-radius: 12px;
  position: relative;

  .review-image {
    img {
      width: 110px;
      height: 110px;
      object-fit: cover;
      border-radius: 50%;
      display: block;
    }
  }

  .description {
    .title {
      font-size: 18px;
      font-family: Pretendard-SemiBold;
    }

    .review-info {
      font-size: 14px;
      padding: 6px 0 8px;
      color: ${(props) => props.theme.colors.darkGray};

      & > span:first-child {
        margin-right: 6px;
      }
    }

    .content {
      font-size: 15px;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${(props) => (props.$showAllContent ? 'none' : 2)};
      -webkit-box-orient: vertical;
    }

    .arrow {
      font-size: 12px;
      padding: 4px;
      margin-top: 6px;
      cursor: pointer;
      background-color: ${(props) => props.theme.colors.gray}30;
      border-radius: 6px;
      transition: all 0.3s;

      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: ${(props) => props.theme.colors.gray}50;
      }
    }
  }

  .buttons {
    position: absolute;
    display: flex;
    right: 12px;
    gap: 12px;

    button {
      height: 20px;
      font-size: 18px;
      color: ${(props) => props.theme.colors.gray};
      transition: all 0.3s;

      &:hover {
        color: ${(props) => props.theme.colors.black};
      }
    }
  }
`;
