
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { cn } from '../../lib/utils';

interface SelectFieldProps {
  placeholder: string;
  value: string;
  classnames?: string;
  data: {label: string, value: string}[]
  onChange: (value: string) => void;
}

const SelectField = ({placeholder, value, data, classnames, onChange}: SelectFieldProps) => {
  return (
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className={cn(classnames, 'hover:text-pickle-500 cursor-pointer backdrop-blur-sm')}>
          <SelectValue placeholder={placeholder}/>
        </SelectTrigger>
        <SelectContent className='text-white backdrop-blur-lg border-none'>
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value} className='hover:text-pickle-500 cursor-pointer'>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
  );
};

export default SelectField;
