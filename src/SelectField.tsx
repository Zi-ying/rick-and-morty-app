
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';

interface SelectFieldProps {
  placeholder: string;
  data: {label: string, value: string}[]
  onChange: (value: string) => void;
}

const SelectField = ({placeholder, data, onChange}: SelectFieldProps) => {
  return (
      <Select onValueChange={onChange}>
        <SelectTrigger className='w-3xs'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
  );
};

export default SelectField;
