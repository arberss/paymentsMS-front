import { NumberInput as CNumberInput } from '@mantine/core';

interface InputProps {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  icon?: string;
  error?: string;
  space?: number;
  min?: number;
  hideControls?: boolean;
  onChange: (value: number) => void;
  value: number | undefined;
  defaultValue?: number;
  formatter?: (value?: string) => string;
  type?: 'number' | 'text';
  precision?: number;
  removeTrailingZeros?: boolean;
}

const NumberInput = (props: InputProps) => {
  const {
    name,
    label,
    description,
    placeholder,
    icon,
    error,
    min = 0,
    hideControls = true,
    onChange,
    value,
    defaultValue,
    formatter,
    type = 'number',
    precision = 0,
    removeTrailingZeros = true,
  } = props;

  return (
    <CNumberInput
      name={name}
      label={label}
      description={description}
      placeholder={placeholder}
      icon={icon}
      error={error}
      min={min}
      hideControls={hideControls}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      type={type}
      precision={precision}
      formatter={formatter}
      removeTrailingZeros={removeTrailingZeros}
    />
  );
};

export default NumberInput;
