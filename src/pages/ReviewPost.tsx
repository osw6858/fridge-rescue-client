import styled from 'styled-components';
import { BasicInput } from '../components/common/BasicInput';
import { BasicTitle } from '../components/common/BasicTitle';
import { DragAndDrop } from '../components/common/DragAndDrop';
import { BasicTextArea } from '../components/common/BasicTextArea';
import { BasicButton } from '../components/common/BasicButton';
import { theme } from '../styles/theme';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewPost } from '../api/review';
import { QUERY_KEY } from '../constants/queryKey';

export const ReviewPost = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const cookId: number = parseInt(location.state.cookId, 10);
  const recipeId: number = parseInt(location.state.recipeId, 10);
  const [droppedImage, setDroppedImage] = useState<File | null>(null);

  const handleImageDrop = (imageFile: File | null) => {
    setDroppedImage(imageFile);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: { title: string; content: string }) =>
      reviewPost(recipeId, cookId, data.title, droppedImage, data.content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_REVIEW],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.DETAIL_RECIPE],
      });
      navigation(`/recipe/${recipeId}`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      content: { value: string };
    };
    const title = target.title.value;
    const content = target.content.value;

    mutation.mutate({ title, content });
  };

  return (
    <ReviewPostContainer>
      <BasicTitle title="레시피 리뷰 등록" />
      <form onSubmit={(e) => handleSubmit(e)}>
        <DragAndDrop text="완성된 요리의" onImageDrop={handleImageDrop} />
        <div className="description">
          <BasicInput type="text" placeholder="제목을 입력하세요" id="title" />
          <BasicTextArea placeholder="레시피 후기를 입력하세요" id="content" />
        </div>
        <div className="buttons">
          <BasicButton
            type="button"
            $bgcolor={theme.colors.white}
            $hoverbgcolor="#ececec"
            $bordercolor="#c0c0c0"
            onClick={() => navigation(-1)}
          >
            돌아가기
          </BasicButton>
          <BasicButton
            type="submit"
            $bgcolor={theme.colors.orange}
            $fontcolor={theme.colors.white}
            $hoverbgcolor="#ff750c"
          >
            등록하기
          </BasicButton>
        </div>
      </form>
    </ReviewPostContainer>
  );
};

const ReviewPostContainer = styled.div`
  .description {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    textarea {
      height: 200px;
    }
  }

  textarea {
    height: 200px;
  }

  .buttons {
    display: flex;
    gap: 12px;
    margin-top: 12px;

    & > button {
    }
  }
`;
