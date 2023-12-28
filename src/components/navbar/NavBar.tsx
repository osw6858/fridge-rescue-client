import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { GoHomeFill } from 'react-icons/go';
import { PiCookingPotFill } from 'react-icons/pi';
import { LuRefrigerator } from 'react-icons/lu';
import { FaBookmark } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentCategoryAtom } from '../../store/menu';

export const NavBar = () => {
  const navigation = useNavigate();
  const [currentCategory, setCurrentCategory] = useRecoilState(currentCategoryAtom);

  return (
    <NavBarContainer>
      <BottomNavigation
        showLabels
        value={currentCategory}
        onChange={(e, newValue) => {
          setCurrentCategory(newValue);
          navigation(newValue);
        }}
      >
        <BottomNavigationAction label="홈" icon={<GoHomeFill />} value="/" />
        <BottomNavigationAction label="레시피" icon={<PiCookingPotFill />} />
        <BottomNavigationAction label="냉장고" icon={<LuRefrigerator />} />
        <BottomNavigationAction label="스크랩" icon={<FaBookmark />} value="/scrap" />
        <BottomNavigationAction label="MY" icon={<FaUser />} value="/mypage" />
      </BottomNavigation>
    </NavBarContainer>
  );
};

const NavBarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
  z-index: 998;

  svg {
    font-size: 24px;
    margin-bottom: 4px;
  }

  .Mui-selected > svg {
    color: ${(props) => props.theme.colors.blue};
  }

  .MuiBottomNavigationAction-label {
    font-size: 10px;
  }

  .Mui-selected .MuiBottomNavigationAction-label {
    font-size: 12px;
    color: ${(props) => props.theme.colors.blue};
  }

  .MuiBottomNavigationAction-root {
    & > border {
      color: ${(props) => props.theme.colors.blue};
    }
  }
`;
