import styled from 'styled-components';

interface PageLayoutProp {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProp) => {
  return <PageContainer>{children}</PageContainer>;
};

const PageContainer = styled.div`
  max-width: 768px;
  min-height: 75vh;
  height: fit-content;
  padding: 100px 30px;
  background-color: ${(props) => props.theme.colors.white};
  margin: 0 auto;
`;
