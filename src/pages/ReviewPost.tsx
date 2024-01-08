import styled from 'styled-components';
import { BasicInput } from '../components/common/BasicInput';
import { BasicTitle } from '../components/common/BasicTitle';
import { DragAndDrop } from '../components/common/DragAndDrop';
import { BasicTextArea } from '../components/common/BasicTextArea';
import { BasicButton } from '../components/common/BasicButton';
import { theme } from '../styles/theme';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ReviewPost = () => {
  const navigation = useNavigate();
  const [droppedImage, setDroppedImage] = useState<FormData | null>();

  const handleImageDrop = (imageFile: FormData | null) => {
    setDroppedImage(imageFile);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      content: { value: string };
    };
    const title = target.title.value;
    const content = target.content.value;
  };

  return (
    <ReviewPostContainer>
      <BasicTitle title="요리 후기 등록" />
      <form onSubmit={(e) => handleSubmit(e)}>
        <DragAndDrop text="완성된 요리의" onImageDrop={handleImageDrop} formDataKey="image" />
        <div className="description">
          <BasicInput type="text" placeholder="제목을 입력하세요" id="title" />
          <BasicTextArea placeholder="요리 후기를 입력하세요" id="content" />
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
