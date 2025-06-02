import { Badge } from '@/components/ui/badge';

interface ChipProps {
  name: string;
  value: string;
  onClick: () => void;
}

const Chip = ({ value, name, onClick }: ChipProps) => {
  return (
    <Badge>
      {name}:
      <span className="font-medium capitalize">{value}</span>
      <div onClick={onClick} className="cursor-pointer">
        X
      </div>
    </Badge>
  );
};

export default Chip;
