import { ReactNode } from 'react';

import SearchInput from './inputs/searchInput';

interface SearchNavigationProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
}

const SearchNavigation = ({
  placeholder,
  value,
  onChange,
  children,
}: SearchNavigationProps) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <SearchInput
        placeholder={placeholder}
        value={value}
        className="p-4 text-white col-start-2 col-end-4"
        onChange={onChange}
      />
      <div>{children}</div>
    </div>
  );
};

export default SearchNavigation;
