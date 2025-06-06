import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ChipProps {
  name: string;
  value: string;
  onClick: () => void;
  disabled?: boolean;
}

const Chip = ({ value, name, onClick, disabled }: ChipProps) => {
  return (
    <Badge className={cn(disabled && 'opacity-50')}>
      {name}:
      <span className="font-medium capitalize">{value}</span>
      <div
        onClick={disabled ? undefined : onClick}
        className={cn(
          'cursor-pointer',
          disabled && 'cursor-not-allowed'
        )}
      >
        X
      </div>
    </Badge>
  );
};

export default Chip;
