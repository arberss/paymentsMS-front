import { Select as MantineSelect, Sx } from '@mantine/core';

interface SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  data: { value: string; label: string }[];
  onChange: (value: string) => void;
  value: string | null;
  defaultValue?: string;
  error?: string;
  searchable?: boolean;
  disabled?: boolean;
  sx?: Sx;
}

const Select = ({
  name,
  label,
  placeholder,
  data,
  onChange,
  value,
  error,
  searchable,
  defaultValue,
  disabled,
  sx,
}: SelectProps) => {
  return (
    <MantineSelect
      name={name}
      label={label}
      placeholder={placeholder}
      data={data}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      error={error}
      searchable={searchable}
      disabled={disabled}
      sx={sx}
    />
  );
};

export default Select;
