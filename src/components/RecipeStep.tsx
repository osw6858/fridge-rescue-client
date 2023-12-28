import { styled } from 'styled-components';
import { BasicButton } from './common/BasicButton';
import { theme } from '../styles/theme';
import { type ChangeEvent } from 'react';

type stepProps = {
  image: string;
  index: number;
  deleteStep: (index: number) => void;
  handleImageStep: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleContentStep: (event: ChangeEvent<HTMLTextAreaElement>, index: number) => void;
  deleteImageStep: (index: number) => void;
};

export const RecipeStep = ({
  image,
  index,
  deleteStep,
  handleImageStep,
  handleContentStep,
  deleteImageStep,
}: stepProps) => {
  return (
    <>
      <DeleteButton>
        <BasicButton
          type="button"
          $bgcolor={theme.colors.orange}
          $fontcolor={theme.colors.white}
          clickFn={() => deleteStep(index)}
        >
          단계 삭제
        </BasicButton>
      </DeleteButton>
      <RecipeContainer>
        <div>
          {image && image ? (
            <>
              <UploadImage src={image} alt="업로드된 이미지" />
              <ButtonWrapper>
                <BasicButton
                  type="button"
                  $bgcolor={theme.colors.orange}
                  $fontcolor={theme.colors.white}
                  clickFn={() => deleteImageStep(index)}
                >
                  사진 삭제
                </BasicButton>
              </ButtonWrapper>
            </>
          ) : (
            <>
              <TempImage>
                <p>이미지</p>
              </TempImage>
              <FileInput
                type="file"
                id="file"
                accept="image/*"
                onChange={(event) => handleImageStep(event, index)}
              />
              <FileLabel htmlFor="file">
                <p>사진추가</p>
              </FileLabel>
            </>
          )}
        </div>
        <Content onChange={(event) => handleContentStep(event, index)}></Content>
      </RecipeContainer>
    </>
  );
};

const RecipeContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DeleteButton = styled.div`
  display: grid;
  justify-content: end;
`;

const UploadImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
`;

const TempImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.theme.colors.gray};
`;

const FileInput = styled.input`
  display: none;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const FileLabel = styled.label`
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.orange};
  color: white;
  cursor: pointer;
  margin-right: 5px;
`;

const Content = styled.textarea`
  width: 90%;
  height: 200px;
  margin-left: 20px;
  border-radius: 10px;
  padding: 12px;
  font-size: 18px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  resize: none;
`;
