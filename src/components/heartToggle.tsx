import { cva, VariantProps } from 'class-variance-authority';
import { Heart } from 'lucide-react';

import { cn } from '@/lib/utils';

interface HeartToggleProps {
  isToggled: boolean;
  variant?: "default" | "outline";
  onToggle: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const heartToggleVariants = cva(
  "[&>svg]:stroke-pink-600 hover:[&>svg]:fill-pink-800 hover:[&>svg]:stroke-pink-800 cursor-pointer inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "[&>svg]:stroke-1.5 [&>svg]:size-5",
        outline: "border border-white [&>svg]:stroke-2 [&>svg]:size-6 h-9 px-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const HeartToggle = ({
  isToggled,
  variant = "default",
  onToggle,
}: HeartToggleProps & VariantProps<typeof heartToggleVariants>) => {
  return (
    <div
      aria-label="Toggle heart"
      onClick={onToggle}
      className={cn(
        heartToggleVariants({ variant }),
        isToggled &&
          "[&>svg]:fill-pink-600 transition delay-150 [&>svg]:stroke-3"
      )}
    >
      <Heart />
    </div>
  );
};

export default HeartToggle;
