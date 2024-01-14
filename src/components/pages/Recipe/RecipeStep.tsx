import { styled } from 'styled-components';
import { BasicButton } from '../../common/BasicButton';
import { theme } from '../../../styles/theme';
import { type ChangeEvent } from 'react';
import { FaPlus } from 'react-icons/fa6';

interface stepProps {
  image: File | null;
  content: string;
  index: number;
  deleteStep: (index: number) => void;
  handleImageStep: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleContentStep: (event: ChangeEvent<HTMLTextAreaElement>, index: number) => void;
  deleteImageStep: (index: number) => void;
}

export const RecipeStep = ({
  image,
  content,
  index,
  deleteStep,
  handleImageStep,
  handleContentStep,
  deleteImageStep,
}: stepProps) => {
  return (
    <>
      <DeleteButton>
        {index >= 1 && (
          <BasicButton
            type="button"
            $bgcolor={theme.colors.orange}
            $fontcolor={theme.colors.white}
            onClick={() => deleteStep(index)}
          >
            단계 삭제
          </BasicButton>
        )}
      </DeleteButton>
      <RecipeContainer>
        <div>
          {image ? (
            <ImageWrapper>
              <UploadImage
                className="uploadImg"
                src={URL.createObjectURL(image)}
                alt="업로드된 이미지"
              />
              <BasicButton
                type="button"
                $bgcolor={theme.colors.orange}
                $fontcolor={theme.colors.white}
                onClick={() => deleteImageStep(index)}
              >
                삭제
              </BasicButton>
            </ImageWrapper>
          ) : (
            <>
              <Placeholder htmlFor={`${index}file`}>
                <p>이미지 추가</p>
                <PlusIcon />
              </Placeholder>
              <FileInput
                type="file"
                id={`${index}file`}
                accept="image/*"
                onChange={(event) => handleImageStep(event, index)}
              />
            </>
          )}
        </div>
        <Content value={content} onChange={(event) => handleContentStep(event, index)}></Content>
      </RecipeContainer>
    </>
  );
};

const RecipeContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;

  .uploadImg:hover {
    opacity: 0.8;
  }
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

const FileInput = styled.input`
  display: none;
`;

const Content = styled.textarea`
  width: 90%;
  height: 260px;
  margin-left: 20px;
  border-radius: 10px;
  padding: 12px;
  font-size: 18px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  resize: none;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Placeholder = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 200px;
  height: 200px;
  border: 3px dashed ${(props) => props.theme.colors.blue}90;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.blue};
  cursor: pointer;

  P {
    margin-bottom: 17px;
  }
`;

const PlusIcon = styled(FaPlus)`
  font-size: 24px;
  margin-bottom: 4px;
`;
