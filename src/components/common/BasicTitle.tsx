import { styled } from 'styled-components';

interface TitleProps {
  title: string;
}

export const BasicTitle = ({ title }: TitleProps) => {
  return <Title>{title}</Title>;
};

const Title = styled.h2`
  font-size: 35px;
  font-weight: 600;
`;
