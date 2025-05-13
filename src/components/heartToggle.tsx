import { Heart } from 'lucide-react';

import { cn } from '@/lib/utils';

interface HeartToggleProps {
  isToggled: boolean;
  variant?: "default" | "outline";
}

const HeartToggle = ({ isToggled, variant = "default" }: HeartToggleProps) => {
  return (
    <div
      aria-label="Toggle heart"
      className={cn(
        "[&>svg]:stroke-pink-600 hover:[&>svg]:fill-pink-800 hover:[&>svg]:stroke-pink-800 cursor-pointer inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-2 min-w-9",
        isToggled &&
          "[&>svg]:fill-pink-600 transition delay-150 [&>svg]:stroke-4",
        variant === "outline" && "border border-white"
      )}
    >
      <Heart />
    </div>
  );
};

export default HeartToggle;
