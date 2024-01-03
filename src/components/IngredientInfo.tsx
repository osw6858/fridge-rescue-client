import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { useState } from 'react';
import { styled } from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BasicButton } from './common/BasicButton';
import { theme } from '../styles/theme';

interface Props {
  name: string;
  expiredAt: string;
  memo: string;
  updateIngredientDetails: (index: number, field: string, value: string) => void;
  index: number;
  isSave: boolean;
}

export const IngredientInfo = ({
  name,
  expiredAt,
  memo,
  updateIngredientDetails,
  index,
  isSave,
}: Props) => {
  const [expanded, setExpanded] = useState<string | false>('');

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleExpiredAtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateIngredientDetails(index, e.target.value, memo);
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateIngredientDetails(index, expiredAt, e.target.value);
  };

  return (
    <Container>
      <Accordion expanded={expanded === name} onChange={handleChange(name)}>
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <IngredientTitle>{name}</IngredientTitle>
        </AccordionSummary>
        <AccordionDetails>
          <Info>
            <Section>
              <Title>
                <p> 유통기한</p>
              </Title>
              <Expiration
                style={isSave ? { backgroundColor: '#f8f8f8' } : { backgroundColor: 'white' }}
                required
                readOnly={isSave}
                type="date"
                value={expiredAt}
                onChange={handleExpiredAtChange}
              ></Expiration>
            </Section>
            <Section>
              <Title>
                <p>간단 메모</p>
              </Title>
              <Memo
                style={isSave ? { backgroundColor: '#f8f8f8' } : { backgroundColor: 'white' }}
                required
                readOnly={isSave}
                value={memo}
                onChange={(e) => handleMemoChange(e)}
              />
            </Section>
            <BasicButton
              type="button"
              $bgcolor={theme.colors.orange}
              $fontcolor={theme.colors.white}
            >
              삭제
            </BasicButton>
          </Info>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
  width: 100%;

  & > div {
    background-color: #f8f8f8;
  }
`;

const IngredientTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > button {
    max-width: 50px;
  }
`;

const Section = styled.div`
  margin: 0 10px 0 10px;
`;

const Title = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;

  & > svg {
    fill: ${(props) => props.theme.colors.gray};
    margin-left: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  & > p {
    margin-left: 10px;
  }
`;

const Expiration = styled.input`
  font-size: 14px;
  width: 150px;
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: 0 10px;
  margin-bottom: 30px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
  }
`;

const Memo = styled.textarea`
  resize: none;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
  }
`;
