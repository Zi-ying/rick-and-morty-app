
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';

interface SelectFieldProps {
  placeholder: string;
  classnames?: string;
  data: {label: string, value: string}[]
  onChange: (value: string) => void;
}

const SelectField = ({placeholder, data, classnames, onChange}: SelectFieldProps) => {
  return (
      <Select onValueChange={onChange}>
        <SelectTrigger className={classnames}>
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
