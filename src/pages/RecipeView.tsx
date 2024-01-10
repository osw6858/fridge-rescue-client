import styled from 'styled-components';
import { BasicButton } from '../components/common/BasicButton';
import { BasicTitle } from '../components/common/BasicTitle';
import { RiBookmarkLine } from 'react-icons/ri';
import { IoHeartOutline } from 'react-icons/io5';
import { PiSiren } from 'react-icons/pi';
import { RecipeReviewList } from '../components/pages/recipe/RecipeReviewList';
import { useState } from 'react';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { useNavigate } from 'react-router-dom';

export const RecipeView = () => {
  const navigation = useNavigate();
  const [cookingCompletion, setCookingCompletion] = useState(false);

  const onAgree = () => {
    navigation('/review-post');
  };

  const handleCookingCompletion = (isComplete: boolean) => {
    setCookingCompletion(isComplete);
  };

  return (
    <RecipeViewContainer>
      <div className="recipe-detail">
        <div className="header">
          <BasicTitle title="존맛탱 마약 떡볶이 만들기" />
          <RiBookmarkLine />
        </div>
        <div className="post-info">
          <div>
            <span className="name">띠띠</span>
            <span className="date">2024-01-02</span>
            <span className="count">조회수 10</span>
          </div>
          <div>
            <div className="icons">
              <span>
                <IoHeartOutline />
              </span>
              <span>2</span>
            </div>
            <div>
              <PiSiren />
            </div>
          </div>
        </div>
        <div className="recipe-step">
          <div className="thumbnail">
            <img src="https://img.siksinhot.com/place/1515555441230703.jpg" alt="썸네일" />
          </div>
          <div className="step">
            <img
              src="https://www.goodtraemall.co.kr/shopimages/cepa0001/006001000017.jpg?1670307118"
              alt="단계별 레시피"
            />
            <div>1. 떡을 야무지게 불립니다.</div>
          </div>
          <div className="step">
            <img
              src="https://www.goodtraemall.co.kr/shopimages/cepa0001/006001000017.jpg?1670307118"
              alt="단계별 레시피"
            />
            <div>2. 떡을 야무지게 불립니다.</div>
          </div>
          <div className="step">
            <img
              src="https://www.goodtraemall.co.kr/shopimages/cepa0001/006001000017.jpg?1670307118"
              alt="단계별 레시피"
            />
            <div>3. 떡을 야무지게 불립니다.</div>
          </div>
        </div>
        <BasicButton
          $bgcolor="#ff8527"
          type="text"
          $fontcolor="#fff"
          onClick={() => handleCookingCompletion(true)}
        >
          요리 완료
        </BasicButton>
      </div>
      <RecipeReviewList />
      {cookingCompletion && (
        <ConfirmModal
          title="레시피 후기를 남길까요?"
          description="레시피 후기 등록 페이지로 이동합니다"
          isOpen={cookingCompletion}
          handleOpen={handleCookingCompletion}
          onAgree={onAgree}
        />
      )}
    </RecipeViewContainer>
  );
};

const RecipeViewContainer = styled.div`
  .header {
    display: flex;
    justify-content: space-between;

    & > svg {
      font-size: 26px;
      cursor: pointer;
    }
  }

  .post-info {
    display: flex;
    justify-content: space-between;

    & > div {
      display: flex;
      gap: 12px;

      &:first-child {
        font-size: 15px;
      }
    }

    svg {
      font-size: 18px;
      cursor: pointer;
    }

    .icons {
      display: flex;
      gap: 2px;
    }

    .name {
      color: ${(props) => props.theme.colors.blue};
      font-family: Pretendard-SemiBold;
    }

    .date {
      color: ${(props) => props.theme.colors.darkGray}90;
    }

    .count {
      color: ${(props) => props.theme.colors.darkGray};
    }
  }

  .recipe-step {
    .thumbnail {
      margin: 12px 0;
      width: 100%;
      max-height: 380px;
      overflow: hidden;

      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }

    .step {
      font-size: 16px;
      padding: 12px 0;

      display: grid;
      align-items: center;
      gap: 12px;
      grid-template-columns: 30% 1fr;

      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }

  button {
    margin-top: 12px;
  }
`;
