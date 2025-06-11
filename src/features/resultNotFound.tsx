import { cn } from '@/lib/utils';

interface ResultNotFoundProps {
  className?: string;
  title?: string;
  subtitle?: string;
  message?: string;
  suggestion?: string;
}

const ResultNotFound = ({
  className,
  title = "Oops!",
  subtitle = "No results found",
  message = "We could not find what you searched for.",
  suggestion = "Try searching again."
}: ResultNotFoundProps) => {
  return (
    <div
      className={cn("items-center justify-center", className)}
      role="alert"
      aria-live="polite"
    >
      <div className="grid gap-4 justify-items-center p-4 backdrop-blur-md rounded-xl m-auto">
        <h1 className="text-pickle-400 text-9xl">{title}</h1>
        <h2 className="text-white text-5xl">{subtitle}</h2>
        <p className="text-white text-4xl">{message}</p>
        <p className="text-white text-3xl contrast-200">{suggestion}</p>
      </div>
    </div>
  );
};

export default ResultNotFound;
