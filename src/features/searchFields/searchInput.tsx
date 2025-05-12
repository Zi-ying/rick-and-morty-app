import { ChangeEvent } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  placeholder: string;
  value: string;
  className: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({
  placeholder,
  value,
  className,
  onChange,
}: SearchInputProps) => {
  return (
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn('backdrop-blur-sm', className)}
      />
  );
};

export default SearchInput;
