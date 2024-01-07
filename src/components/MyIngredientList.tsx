import { useQuery } from '@tanstack/react-query';
import { getIngredient } from '../api/ingredient/getIngredient';
import { QUERY_KEY } from '../constants/queryKey';
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Accordion, AccordionSummary } from '@mui/material';

export const MyIngredientList = () => {
  const { data } = useQuery({ queryKey: [QUERY_KEY.ADD_INGREDIENT], queryFn: getIngredient });
  return (
    <Container>
      <p>재료 목록</p>
      {data?.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <p>{item.name}</p>
          </AccordionSummary>
          <div>
            <p>{item.expiredAt}</p>
            <p>{item.memo}</p>
          </div>
          <div>
            <button type="button">수정</button>
            <button type="button">삭제</button>
          </div>
        </Accordion>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 10px;

  & > p {
    font-size: 20px;
    font-weight: 600;
    margin-top: 40px;
  }
`;
