import { Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ExpansionButtonProps {
  expanded: boolean;
  onClick: () => void;
  'aria-label'?: string;
}

const ExpansionButton = ({
  expanded,
  onClick,
  'aria-label': ariaLabel = expanded ? 'Collapse section' : 'Expand section'
}: ExpansionButtonProps) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="w-fit self-stretch [&>svg]:stroke-3"
      aria-expanded={expanded}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      {expanded ? <Minus /> : <Plus />}
    </Button>
  );
};

export default ExpansionButton;
