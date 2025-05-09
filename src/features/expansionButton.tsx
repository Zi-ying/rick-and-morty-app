import { Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ExpansionButtonProps {
  expanded: boolean;
  onClick: () => void;
}

const ExpansionButton = ({ expanded, onClick }: ExpansionButtonProps) => {
  return (
    <Button onClick={onClick} className="w-fit self-stretch [&>svg]:stroke-3">
      {expanded ? <Minus /> : <Plus />}
    </Button>
  );
};

export default ExpansionButton;
