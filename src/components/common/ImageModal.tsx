import { useRef } from 'react';
import styled from 'styled-components';
import { FaCirclePlus, FaCircleMinus } from 'react-icons/fa6';
import {
  TransformWrapper,
  type ReactZoomPanPinchContentRef,
  TransformComponent,
} from 'react-zoom-pan-pinch';

interface ImageModalProps {
  imageUrl: string;
  alt: string;
  handleImageModal: (isOpen: boolean) => void;
}

export const ImageModal = ({ imageUrl, alt, handleImageModal }: ImageModalProps) => {
  const transformRef = useRef<ReactZoomPanPinchContentRef>(null);

  const handleZoomIn = () => {
    if (transformRef.current) {
      transformRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (transformRef.current) {
      transformRef.current.zoomOut();
    }
  };

  return (
    <>
      <Overlay onClick={() => handleImageModal && handleImageModal(false)} />
      <ImageModalContainer>
        <ImageContainer>
          <TransformWrapper ref={transformRef} initialScale={1}>
            <TransformComponent>
              <Image src={imageUrl} alt={alt} />
            </TransformComponent>
          </TransformWrapper>
          <ZoomControls>
            <FaCirclePlus className="control-icon" onClick={handleZoomIn} role="button" />
            <br />
            <FaCircleMinus className="control-icon" onClick={handleZoomOut} role="button" />
          </ZoomControls>
        </ImageContainer>
      </ImageModalContainer>
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(26, 26, 26, 0.3);
  z-index: 1000;
`;

const ImageModalContainer = styled.div`
  z-index: 1000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 250px;
  min-height: 250px;

  background-color: #fff;
  border: 3px solid ${(props) => props.theme.colors.gray};
  border-radius: 12px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  padding: 12px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 12px;
`;

const ZoomControls = styled.span`
  position: fixed;
  bottom: 10px;
  right: 20px;
  user-select: none;

  .control-icon {
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 28px;
    opacity: 0.3;
    transition: all 0.3s;

    &:hover {
      opacity: 0.5;
    }
  }
`;
