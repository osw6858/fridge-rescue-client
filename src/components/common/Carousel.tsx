import Slider from 'react-slick';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import styled from 'styled-components';
import { Chip } from '@mui/material';

interface CarouselProps {
  carouselImageInfo: string[];
  dotsState: boolean;
  viewCount: number;
}

export const Carousel = ({ carouselImageInfo, dotsState, viewCount }: CarouselProps) => {
  const settings = {
    dots: dotsState,
    infinite: true,
    speed: 500,
    slidesToShow: viewCount,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: true,
    swipeToSlide: true,
    arrow: false,
  };

  return (
    <StyledSlider {...settings}>
      {carouselImageInfo?.map((item: string) => (
        <Card sx={{ maxWidth: '100%' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                1위
              </Avatar>
            }
            title="존맛탱 음식"
            subheader="띠띠"
          />
          <CardMedia component="img" height="194" image={item} alt="음식" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              너무너무 맛있어서 다이어트 실패하는 레시피를 가져왔어요! 너무너무 맛있어서 다이어트
              실패하는 레시피를 가져왔어요! 너무너무 맛있어서 다이어트 실패하는 레시피를 가져왔어요!
              너무너무 맛있어서 다이어트 실패하는 레시피를 가져왔어요! 너무너무 맛있어서 다이어트
              실패하는 레시피를 가져왔어요! 너무너무 맛있어서 다이어트 실패하는 레시피를 가져왔어요!
              너무너무 맛있어서 다이어트 실패하는 레시피를 가져왔어요! 너무너무 맛있어서 다이어트
              실패하는 레시피를 가져왔어요! 너무너무 맛있어서 다이어트 실패하는 레시피를 가져왔어요!
              너무너무 맛있어서 다이어트 실패하는 레시피를 가져왔어요! 너무너무 맛있어서 다이어트
              실패하는 레시피를 가져왔어요! 너무너무 맛있어서 다이어트 실패하는 레시피를 가져왔어요!
              너무너무 맛있어서 다이어트 실패하는 레시피를 가져왔어요! 너무너무 맛있어서 다이어트
              실패하는 레시피를 가져왔어요! 너무너무 맛있어서 다이어트 실패하는 레시피를 가져왔어요!
              너무너무 맛있어서 다이어트 실패하는 레시피를 가져왔어요!
            </Typography>
            <h5>일치하는 재료</h5>
            <div className="chips">
              <Chip label="양파" />
              <Chip label="마늘" />
              <Chip label="후추" />
            </div>
          </CardContent>
        </Card>
      ))}
    </StyledSlider>
  );
};

const StyledSlider = styled(Slider)`
  width: 100%;
  overflow-x: hidden;

  .slick-track {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
  }

  img {
    max-width: 100%;
    max-height: 500px;
    object-fit: cover;
  }

  .MuiTypography-body2 {
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    font-family: Pretendard-Regular;
  }

  h5 {
    padding: 12px 0;
  }

  .chips {
    display: flex;
    gap: 6px;
    margin-bottom: -6px;
  }

  .slick-prev,
  .slick-next {
    background-color: red;
    visibility: hidden;
  }

  .slick-dots {
    display: flex !important;
    justify-content: center;
  }

  .slick-dots li {
    button {
      font-size: 0;
      width: 8px;
      height: 8px;
      margin: 0 5px;
      border-radius: 50%;
      background-color: ${(props) => props.theme.colors.gray}80;
    }
  }
  .slick-dots li.slick-active button {
    background-color: ${(props) => props.theme.colors.gray};
  }
`;
