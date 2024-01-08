import { Skeleton, Stack } from '@mui/material';
import { styled } from 'styled-components';

export const FallBack = ({ length }: { length: number }) => {
  return (
    <Container>
      {new Array(length).fill(1).map((_, index) => (
        <Stack key={index} spacing={1} style={{ marginRight: '15px' }}>
          <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={200} />
        </Stack>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: clip;
  align-items: flex-start;
  margin-bottom: 80px;

  &::-webkit-scrollbar {
    height: 8px;
    background-color: ${(props) => props.theme.colors.lightGray};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.gray};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.colors.darkGray};
  }
`;
