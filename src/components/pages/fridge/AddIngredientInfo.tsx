import { styled } from 'styled-components';
import { BasicButton } from '../../common/BasicButton';
import { theme } from '../../../styles/theme';
import { device } from '../../../styles/media';
import { Controller, type Control } from 'react-hook-form';

interface IngredientProps {
  deleteAddedIngredient: (index: number, name: string) => void;
  ingredientDetails: string[];
  control: Control;
}

export const AddIngredientInfo = ({
  deleteAddedIngredient,
  ingredientDetails,
  control,
}: IngredientProps) => {
  return (
    <>
      {ingredientDetails.map((ingredient, index) => (
        <Container key={index}>
          <IngredientTitle>{ingredient}</IngredientTitle>
          <Info>
            <Section>
              <Title>
                <p> 유통기한</p>
              </Title>
              <Controller
                name={`${ingredient}.expiredAt`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Expiration
                    id={`${ingredient}.expiredAt`}
                    required
                    type="date"
                    {...field}
                  ></Expiration>
                )}
              />
            </Section>
            <Section>
              <Title>
                <p>간단 메모</p>
              </Title>
              <Controller
                name={`${ingredient}.memo`}
                control={control}
                defaultValue=""
                render={({ field }) => <Memo id={`${ingredient}.memo`} required {...field} />}
              />
            </Section>
            <BasicButton
              type="button"
              $bgcolor={theme.colors.orange}
              $fontcolor={theme.colors.white}
              onClick={() => deleteAddedIngredient(index, ingredient)}
            >
              삭제
            </BasicButton>
          </Info>
        </Container>
      ))}
    </>
  );
};

const Container = styled.div`
  margin-top: 20px;
  width: 100%;

  & > div {
    background-color: ${(props) => props.theme.colors.grayishWhite};
    border-radius: 10px;
    padding: 10px;
  }
`;

const IngredientTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 14px;

  & > button {
    max-width: 50px;
  }

  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
    align-items: baseline;

    & > button {
      margin-top: 20px;
    }
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
  transition: all 0.3s ease;

  &:focus {
    outline: none;
  }
`;

const Memo = styled.textarea`
  height: 40px;
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
