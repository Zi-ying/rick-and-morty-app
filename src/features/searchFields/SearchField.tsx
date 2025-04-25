import { ChangeEvent } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchFieldProps {
  placeholder: string;
  value: string;
  className: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchField = ({
  placeholder,
  value,
  className,
  onChange,
}: SearchFieldProps) => {
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

export default SearchField;
