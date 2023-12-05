import { FC, memo } from "react";

interface Props {
  isDisabled?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}
const SearchInput: FC<Props> = ({ isDisabled, placeholder, onChange, value }) => {
  return (
    <input
      value={value}
      type="text"
      placeholder={placeholder}
      className="input input-bordered w-60 input-sm"
      onChange={(event) => onChange?.(event.target.value)}
      disabled={isDisabled}
    />
  );
};

export default memo(SearchInput);
