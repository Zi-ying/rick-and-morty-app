import { Heart } from 'lucide-react';

import { cn } from '../lib/utils';
import { Toggle } from './ui/toggle';

interface HeartToggleProps {
  isToggled: boolean
  onToggle: () => void;
}

const HeartToggle = ({isToggled, onToggle}: HeartToggleProps) => {
  return (
    <Toggle
      aria-label="Toggle heart"
      onClick={onToggle}
    >
      <Heart className={cn('stroke-pink-600', isToggled ? "fill-pink-600" : "")} />
    </Toggle>
  );
};

export default HeartToggle
