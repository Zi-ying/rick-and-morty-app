import { ChangeEvent } from 'react';

import { Input } from '../../components/ui/input';

interface SearchFieldProps {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>)=> void;

}

const SearchField = ({placeholder, value, onChange}: SearchFieldProps) => {
  return (
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='p-4'
      />
  );
};

export default SearchField
