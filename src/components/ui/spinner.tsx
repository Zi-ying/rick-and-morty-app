interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <div className="grid gap-4 items-center justify-center p-4">
      <div
      className="inline-block self-justify-center w-10 h-10 border-4 rounded-full border-pickle-500 animate-spin"
      />
      <p className="text-pickle-500">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
