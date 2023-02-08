import { TextInput } from '@mantine/core';
import React from 'react';

interface InputProps {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  icon?: string;
  error?: string;
  space?: number;
  onChange: (event?: React.ChangeEvent) => void;
  value: any;
  defaultValue?: string;
  type?: string;
}

const Input = (props: InputProps) => {
  const {
    name,
    label,
    description,
    placeholder,
    icon,
    error,
    onChange,
    value,
    type = 'text',
    defaultValue
  } = props;

  return (
    <TextInput
      name={name}
      label={label}
      description={description}
      placeholder={placeholder}
      icon={icon}
      error={error}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      type={type}
    />
  );
};

export default Input;
