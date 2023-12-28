import styled from 'styled-components';

interface BasicButtonProps {
  children: React.ReactNode;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clickFn?: (param?: any) => void;
  $bgcolor: string;
  $hoverbgcolor?: string;
  $fontcolor?: string;
  $bordercolor?: string;
}

export const BasicButton = ({
  children,
  type,
  clickFn,
  $bgcolor,
  $hoverbgcolor,
  $fontcolor = '#000',
  $bordercolor,
}: BasicButtonProps) => {
  return (
    <BasicButtonWrap
      type={type}
      onClick={clickFn}
      $bgcolor={$bgcolor}
      $hoverbgcolor={$hoverbgcolor}
      $fontcolor={$fontcolor}
      $bordercolor={$bordercolor}
    >
      {children}
    </BasicButtonWrap>
  );
};

const BasicButtonWrap = styled.button<BasicButtonProps>`
  width: 100%;
  font-size: 14px;
  color: ${(props) => props.$fontcolor};
  background-color: ${(props) => props.$bgcolor};
  border: 1px solid ${(props) => (props.$bordercolor ? props.$bordercolor : props.$bgcolor)};
  padding: 12px 6px;
  border-radius: 8px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.$hoverbgcolor};
  }
`;
