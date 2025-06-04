import { cva, VariantProps } from 'class-variance-authority';

interface SpinnerProps {
  message?: string;
}

const spinnerVariants = cva(
  "inline-block self-justify-center border-4 rounded-full border-pickle-500 animate-spin",
  {
    variants: {
      size: {
        default: "size-10",
        sm: "size-8",
        lg: "size-16",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

function Spinner({
  size,
  message,
}: SpinnerProps & VariantProps<typeof spinnerVariants>) {
  return (
    <div className="m-auto">
      <div className={spinnerVariants({ size })} />
      <p className="text-pickle-500">{message}</p>
    </div>
  );
}

export default Spinner;
