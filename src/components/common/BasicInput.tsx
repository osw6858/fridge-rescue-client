import styled from 'styled-components';

interface BasicInputProps {
  id?: string;
  type: string;
  placeholder?: string;
  onChange?: () => void;
  value?: string;
}

export const BasicInput = ({ id, type, placeholder, onChange, value }: BasicInputProps) => {
  return (
    <BasicInputWrap
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    ></BasicInputWrap>
  );
};

const BasicInputWrap = styled.input`
  object-fit: contain;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  padding: 14px 10px;
`;
