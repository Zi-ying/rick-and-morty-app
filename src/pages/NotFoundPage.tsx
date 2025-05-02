import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

interface NotFoundPageProps {
  errorMessage?: string;
}

const NotFoundPage = ({ errorMessage }: NotFoundPageProps) => {
  return (
    <div className="flex items-center justify-center p-4 backdrop-blur-xs rounded-xl">
      <div className='grid gap-4 justify-items-center'>
        <h1 className="text-pickle-500 text-9xl">Oops!</h1>
        <h5 className="text-white text-5xl">
          We couldn't find what you were looking for.
        </h5>
        <h5 className="text-white text-4xl">{errorMessage ? errorMessage : ""}</h5>
        <Link to="/">
          <Button>Go home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
