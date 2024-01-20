import { forwardRef } from 'react';
import styled from 'styled-components';

interface BasicInputProps {
  id?: string;
  type: string;
  placeholder?: string;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
}

export const BasicInput = forwardRef<HTMLInputElement, BasicInputProps>(
  ({ id, type, placeholder, onChange, value, defaultValue }, ref) => {
    return (
      <BasicInputWrap
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        ref={ref}
      ></BasicInputWrap>
    );
  }
);

const BasicInputWrap = styled.input`
  object-fit: contain;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  padding: 14px 10px;
`;
