import Slider from 'react-slick';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import styled from 'styled-components';
import { type Recipe } from '../../types/recipeType';
import { formatDate } from '../../utils/formatDate';
import { PiCookingPotDuotone, PiEyeDuotone } from 'react-icons/pi';

interface CarouselProps {
  carouselDataInfo: Recipe[];
  dotsState: boolean;
  viewCount: number;
}

export const Carousel = ({ carouselDataInfo, dotsState, viewCount }: CarouselProps) => {
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
      {carouselDataInfo?.map((item: Recipe, idx: number) => (
        <Card sx={{ maxWidth: '100%', height: '450px' }} key={idx}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                <span className="ranking">{idx + 1}위</span>
              </Avatar>
            }
            title={<div className="nickname">{item.author.nickname}</div>}
            subheader={<div className="date">{formatDate(item.createdAt)}</div>}
          />
          <CardMedia component="img" height="194" image={item.imageUrl} alt="음식" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <h5 className="title">{item.title}</h5>
            </Typography>
            <div className="summary">{item.summary}</div>
            <div className="counts">
              <span>
                <span>
                  <PiEyeDuotone />
                </span>
                <span>{item.viewCount}</span>
              </span>
              <span>
                <span>
                  <PiCookingPotDuotone />
                </span>
                <span>{item.reviewCount}</span>
              </span>
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
    display: block;
    padding: 12px;
    position: relative;
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

  .title {
    padding: 12px 0;
    font-size: 16px;
    color: ${(props) => props.theme.colors.black};
  }

  .summary {
    font-size: 14px;
    color: ${(props) => props.theme.colors.darkGray};
    word-wrap: break-word;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
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

  .nickname {
    font-size: 16px;
    font-family: Pretendard-Bold;
  }

  .date {
    font-family: Pretendard-SemiBold;
  }

  .ranking {
    font-size: 18px;
    font-family: Pretendard-SemiBold;
  }

  .counts {
    position: absolute;
    bottom: 30px;
    right: 30px;
    display: flex;
    gap: 12px;

    & > span {
      display: flex;
      gap: 4px;

      & > span {
        display: flex;
        align-items: center;
      }
    }
  }
`;
