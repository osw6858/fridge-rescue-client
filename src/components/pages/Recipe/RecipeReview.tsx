import styled from 'styled-components';
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from 'react-icons/io';
import { useState } from 'react';
import { ImageModal } from '../../common/ImageModal';
import type { Review } from '../../../types/reviewType';
import { formatDate } from '../../../utils/formatDate';

export const RecipeReview = ({ reviewData }: { reviewData: Review }) => {
  const [isImageModalOpened, setImageModalOpen] = useState(false);
  const [showAllContent, setShowAllContent] = useState(false);

  const handleImageModal = (isOpen: boolean) => {
    setImageModalOpen(isOpen);
  };

  const handleToggleContent = () => {
    setShowAllContent((prev) => !prev);
  };

  return (
    <>
      <RecipeReviewContainer $showAllContent={showAllContent}>
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
`;
