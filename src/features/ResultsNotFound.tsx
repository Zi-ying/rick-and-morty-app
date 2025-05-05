import { cn } from '@/lib/utils';

interface ResultsNotFoundProps {
  className?: string;
}

const ResultsNotFound = ({className}: ResultsNotFoundProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="grid gap-4 justify-items-center p-4 backdrop-blur-md invert rounded-xl m-auto">
        <h1 className="text-pickle-400 text-9xl">Oops!</h1>
        <h5 className="text-white text-5xl">No results found</h5>
        <h5 className="text-white text-4xl">
          We could not find what you searched for.
        </h5>
        <h5 className="text-white text-3xl contrast-200">Try searching again.</h5>
      </div>
    </div>
  );
};

export default ResultsNotFound;
