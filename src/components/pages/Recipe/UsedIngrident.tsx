import { styled } from 'styled-components';
import { MdClose } from 'react-icons/md';

interface Ingredient {
  name: string;
  amount: string;
}

interface AddedIngredient {
  addItemList: Ingredient[] | undefined;
  setAddItemList: (name: string, amount: string) => void;
  deletItem: (name: string) => void;
}

export const UsedIngrident = ({ addItemList, setAddItemList, deletItem }: AddedIngredient) => {
  return (
    <AddIngrident>
      {addItemList?.map((e, i) => (
        <Ingridient key={i}>
          <div>
            <span>{e.name}</span>
            <MdClose onClick={() => deletItem(e.name)} />
          </div>
          <input
            type="text"
            placeholder="재료 양"
            onChange={(event) => setAddItemList(e.name, event.target.value)}
          ></input>
        </Ingridient>
      ))}
    </AddIngrident>
  );
};

const AddIngrident = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
  gap: 10px;
  margin: 10px;
`;

const Ingridient = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.darkGray};
  padding: 10px;
  border-radius: 10px;
  width: 100%;

  div > svg {
    position: absolute;
    top: 3px;
    right: 5px;
    cursor: pointer;
  }

  div > span {
    font-weight: 600;
  }

  input {
    border-radius: 5px;
    outline: none;
    width: 70px;
    height: 30px;
    padding-left: 10px;
    margin-top: 10px;
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.gray};
  }
`;
