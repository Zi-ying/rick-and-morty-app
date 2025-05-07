import { Heart } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Toggle } from './ui/toggle';

interface HeartToggleProps {
  isToggled: boolean;
  onToggle: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: "default" | "outline";
}

const HeartToggle = ({
  isToggled,
  onToggle,
  variant = "default",
}: HeartToggleProps) => {
  return (
    <Toggle
      aria-label="Toggle heart"
      onClick={onToggle}
      className={cn(
        " [&>svg]:stroke-pink-600 hover:[&>svg]:fill-pink-600 cursor-pointer",
        isToggled && "[&>svg]:fill-pink-600",
        variant === "outline" && "border border-white"
      )}
    >
      <Heart />
    </Toggle>
  );
};

export default HeartToggle;
