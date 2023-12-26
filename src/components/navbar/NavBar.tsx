import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useState } from 'react';
import { GoHomeFill } from 'react-icons/go';
import { PiCookingPotFill } from 'react-icons/pi';
import { LuRefrigerator } from 'react-icons/lu';
import { FaBookmark } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import styled from 'styled-components';

export const NavBar = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  return (
    <NavBarContainer>
      <BottomNavigation
        showLabels
        value={selectedCategory}
        onChange={(e, newValue) => {
          setSelectedCategory(newValue);
        }}
      >
        <BottomNavigationAction label="홈" icon={<GoHomeFill />} />
        <BottomNavigationAction label="레시피" icon={<PiCookingPotFill />} />
        <BottomNavigationAction label="냉장고" icon={<LuRefrigerator />} />
        <BottomNavigationAction label="스크랩" icon={<FaBookmark />} />
        <BottomNavigationAction label="MY" icon={<FaUser />} />
      </BottomNavigation>
    </NavBarContainer>
  );
};

const NavBarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9999;

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
