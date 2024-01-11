import styled from 'styled-components';
import { BasicButton } from '../components/common/BasicButton';
import { BasicTitle } from '../components/common/BasicTitle';
import { RiBookmarkLine } from 'react-icons/ri';
import { BsExclamationSquare } from 'react-icons/bs';
import { PiSiren, PiCookingPotDuotone, PiEyeDuotone } from 'react-icons/pi';
import { GiCook } from 'react-icons/gi';
import { RecipeReviewList } from '../components/pages/recipe/RecipeReviewList';
import { useState } from 'react';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getDetailRecipe } from '../api/recipe';
import { QUERY_KEY } from '../constants/queryKey';
import { formatDate } from '../utils/formatDate';
import { Chip } from '@mui/material';
import type { Ingredient, RecipeSteps } from '../types/recipeType';

export const RecipeView = () => {
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const recipeId = pathname.split('/').pop() || '';
  const [cookingCompletion, setCookingCompletion] = useState(false);

  const onAgree = () => {
    navigation('/review-post');
  };

  const handleCookingCompletion = (isComplete: boolean) => {
    setCookingCompletion(isComplete);
  };

  const { data } = useQuery({
    queryKey: [QUERY_KEY.DETAIL_RECIPE],
    queryFn: () => getDetailRecipe(recipeId),
    select: (data) => data.data,
  });

  // TODO : 더미 데이터 이미지 없음 -> 실 데이터 가져올 때 이미지만 연동하면 됨
  return (
    <RecipeViewContainer>
      <div className="recipe-detail">
        <div className="header">
          <BasicTitle title={data?.title} />
        </div>
        <div className="post-info">
          <div>
            <span className="name">{data?.author.nickname}</span>
            <span className="date">{formatDate(data?.createdAt)}</span>
            <span className="count">
              <span>
                <PiEyeDuotone /> {data?.viewCount}
              </span>
              <span>
                <PiCookingPotDuotone />
                {data?.reviewCount}
              </span>
            </span>
          </div>
          <div>
            <div className="icons">
              <span>
                <RiBookmarkLine />
              </span>
              <span>{data?.bookmarkCount}</span>
            </div>
            <div className="icons">
              <span>
                <PiSiren />
              </span>
              <span>{data?.reportCount}</span>
            </div>
          </div>
        </div>
        <div className="recipe-step">
          <div className="thumbnail">
            <img src="https://img.siksinhot.com/place/1515555441230703.jpg" alt="썸네일" />
          </div>
          <p className="summary">{data?.summary}</p>

          <div className="ingredient">
            <h3>
              <GiCook />
              재료
            </h3>
            <span className="chips">
              {data?.recipeIngredients.map((ingredient: Ingredient) => {
                return (
                  <>
                    <Chip label={`${ingredient.name} ${ingredient.amount}`} key={ingredient.name} />
                  </>
                );
              })}
            </span>
          </div>

          {data?.recipeSteps.map((step: RecipeSteps) => {
            return (
              <div className="step" key={step.stepNo}>
                <img
                  src="https://www.goodtraemall.co.kr/shopimages/cepa0001/006001000017.jpg?1670307118"
                  alt="단계별 레시피"
                />
                <div>{step.stepContents}</div>
                {step.stepTip && (
                  <div className="tip">
                    <BsExclamationSquare />
                    tip : {step.stepTip}
                  </div>
                )}
              </div>
            );
          })}
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
      display: flex;
      gap: 12px;

      & > span {
        display: flex;
        gap: 3px;
      }
    }
  }

  .recipe-step {
    .ingredient {
      border: 1px solid ${(props) => props.theme.colors.lightGray};
      border-radius: 12px;
      padding: 24px;
      margin-top: 24px;

      h3 {
        color: ${(props) => props.theme.colors.black};
        margin: 0 0 12px 4px;
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
    }

    .summary {
      padding: 24px 0;
    }

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
      margin-top: 36px;

      img {
        width: 100%;
        height: auto;
        display: block;
      }

      .tip {
        display: flex;
        align-items: center;
        gap: 6px;
        color: ${(props) => props.theme.colors.darkGray};
      }

      svg {
        color: ${(props) => props.theme.colors.orange};
      }
    }
  }

  button {
    margin-top: 12px;
  }
`;
