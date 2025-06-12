import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

interface NotFoundPageProps {
  errorMessage?: string;
};

const NotFoundPage = ({ errorMessage }: NotFoundPageProps) => {
  return (
    <main
      className="flex items-center justify-center p-4 backdrop-blur-xs rounded-xl"
      role="main"
      aria-label="Page not found"
    >
      <section className="grid gap-4 justify-items-center">
        <h1 className="text-pickle-500 text-9xl" aria-label="Error message">Oops!</h1>
        <h2 className="text-white text-5xl">
          We couldn't find what you were looking for.
        </h2>
        {errorMessage && (
          <p className="text-white text-4xl">{errorMessage}</p>
        )}
        <Link to="/" aria-label="Return to home page">
          <Button>Go home</Button>
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
