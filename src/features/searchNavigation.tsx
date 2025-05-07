import { ReactNode } from 'react';

import HeartToggle from '@/components/heart-toggle';

import SearchField from './searchFields/SearchField';

interface SearchNavigationProps {
  placeholder: string;
  value: string;
  toggled: boolean;
  children?: ReactNode;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggle: () => void;

}

const SearchNavigation = ({
  placeholder,
  value,
  toggled,
  children,
  onSearchChange,
  onToggle,
}: SearchNavigationProps) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <SearchField
        placeholder={placeholder}
        value={value}
        className="p-4 text-white col-start-2 col-end-4"
        onChange={onSearchChange}
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
