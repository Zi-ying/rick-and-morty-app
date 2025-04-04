interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <div className="text-center p-4">
      <div
      className="inline-block w-8 h-8 border-2 rounded-full border-[#01b6a5] animate-spin"
      />
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
