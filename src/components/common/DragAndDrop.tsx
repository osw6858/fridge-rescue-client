import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa6';
import Dropzone from 'react-dropzone';
import { useEffect, useState } from 'react';

interface DragAndDropProps {
  text: string;
  onImageDrop: (imageFile: File | null) => void;
  defaultValue?: string;
}

export const DragAndDrop = ({ text, onImageDrop, defaultValue }: DragAndDropProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(defaultValue || null);

  useEffect(() => {
    if (defaultValue) {
      setPreviewImage(defaultValue);
    }
  }, [defaultValue]);

  const handleImageDrop = (files: File[]) => {
    setIsDragging(true);
    const newImage = URL.createObjectURL(files[0]);
    setPreviewImage(newImage);
    onImageDrop(files[0]);
  };

  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        handleImageDrop(acceptedFiles);
      }}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      maxFiles={1}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <DragDropBox className={isDragging ? 'is--drag' : ''}>
              {previewImage ? (
                <img src={previewImage} alt="드롭이미지 미리보기" />
              ) : (
                <div>
                  <PlusIcon />
                  <div>{text} 이미지를 등록하세요</div>
                </div>
              )}
            </DragDropBox>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

const DragDropBox = styled.div`
  margin-top: 8px;
  border: 3px dashed ${(props) => props.theme.colors.blue}90;
  border-radius: 4px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  &.is--drag {
    border: 3px dashed ${(props) => props.theme.colors.blue};
    & > div {
      color: ${(props) => props.theme.colors.blue};
    }
  }

  & > div {
    text-align: center;
    color: ${(props) => props.theme.colors.blue}90;
    padding: 24px;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

const PlusIcon = styled(FaPlus)`
  font-size: 24px;
  margin-bottom: 4px;
`;
