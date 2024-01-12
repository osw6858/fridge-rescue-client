import styled from 'styled-components';
import { IoMdArrowRoundDown } from 'react-icons/io';
import { useState } from 'react';
import { ImageModal } from '../../common/ImageModal';

export const RecipeReview = () => {
  const [isImageModalOpened, setImageModalOpen] = useState(false);

  const handleImageModal = (isOpen: boolean) => {
    setImageModalOpen(isOpen);
  };

  // TODO : ID 받아서 해당 게시글 더보기 toggle 구현
  return (
    <>
      <RecipeReviewContainer>
        <div className="review-image" role="button" onClick={() => handleImageModal(true)}>
          <img
            src="https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/bskh/image/cXN5XKBUKfmpGaxWVTIMnLlSH6E"
            alt="리뷰 썸네일"
          />
        </div>
        <div className="description">
          <div className="title">저두요!</div>
          <div className="review-info">
            <span>2023-01-02</span>
            <span>띠띠</span>
          </div>
          <div className="content">
            저도 한번 만들어 봤는데요! 저도 한번 만들어 봤는데요!저도 한번 만들어 봤는데요!저도 한번
            만들어 봤는데요!저도 한번 만들어 봤는데요!저도 한번 만들어 봤는데요!저도 한번 만들어
            봤는데요!저도 한번 만들어 봤는데요!저도 한번 만들어 봤는데요!저도 한번 만들어
            봤는데요!저도 한번 만들어 봤는데요!
          </div>
          <div className="arrow">
            <span>더보기</span>
            <IoMdArrowRoundDown />
          </div>
        </div>
      </RecipeReviewContainer>
      {isImageModalOpened && (
        <ImageModal
          imageUrl="https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/bskh/image/cXN5XKBUKfmpGaxWVTIMnLlSH6E"
          alt="음식"
          handleImageModal={handleImageModal}
        />
      )}
    </>
  );
};

const RecipeReviewContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 24px;
  padding: 12px;
  background-color: ${(props) => props.theme.colors.grayishWhite};
  border-radius: 12px;

  .review-image {
    img {
      width: 100%;
      height: auto;
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
      -webkit-line-clamp: 2;
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
