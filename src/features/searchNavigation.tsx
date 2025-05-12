import { ReactNode } from 'react';

import HeartToggle from '@/components/heartToggle';

import SearchInput from './inputs/searchInput';

interface SearchNavigationProps {
  placeholder: string;
  value: string;
  toggled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggle: () => void;
  children?: ReactNode;
}

const SearchNavigation = ({
  placeholder,
  value,
  toggled,
  onChange,
  onToggle,
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
      <div className="flex gap-2">
        <HeartToggle
          variant="outline"
          isToggled={toggled}
          onToggle={onToggle}
        />
        {children}
      </div>
    </div>
  );
};

export default SearchNavigation;
