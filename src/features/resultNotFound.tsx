import { cn } from '@/lib/utils';

interface ResultNotFoundProps {
  className?: string;
}

const ResultNotFound = ({className}: ResultNotFoundProps) => {
  return (
    <div className={cn("items-center justify-center", className)}>
      <div className="grid gap-4 justify-items-center p-4 backdrop-blur-md rounded-xl m-auto">
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

export default ResultNotFound;
