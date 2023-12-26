import styled from 'styled-components';

interface PageLayoutProp {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProp) => {
  return <PageContainer>{children}</PageContainer>;
};

const PageContainer = styled.div`
  width: 768px;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.white};
  margin: 0 auto;
`;
