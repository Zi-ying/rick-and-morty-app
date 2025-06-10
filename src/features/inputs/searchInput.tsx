import { ChangeEvent } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  placeholder: string;
  value: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  'aria-label'?: string;
}

const SearchInput = ({
  placeholder,
  value,
  className,
  onChange,
  'aria-label': ariaLabel = 'Search',
}: SearchInputProps) => {
  return (
    <Input
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={cn('backdrop-blur-sm', className)}
      role="searchbox"
      aria-label={ariaLabel}
    />
  );
};

export default SearchInput;
