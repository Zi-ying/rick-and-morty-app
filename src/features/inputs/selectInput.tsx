import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface SelectInputProps {
  placeholder: string;
  value: string;
  data: {label: string, value: string}[]
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

const SelectInput = ({
  placeholder,
  value,
  data,
  className,
  onChange,
  disabled,
  'aria-label': ariaLabel,
}: SelectInputProps) => {
  return (
      <Select onValueChange={onChange} value={value} disabled={disabled}>
        <SelectTrigger
          className={cn(
            className,
            'hover:text-pickle-500 cursor-pointer backdrop-blur-lg',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          aria-label={ariaLabel}
        >
          <SelectValue placeholder={placeholder}/>
        </SelectTrigger>
        <SelectContent className='text-white backdrop-blur-lg border-none'>
          {data.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className='hover:text-pickle-500 cursor-pointer'
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
  );
};

export default SelectInput;
