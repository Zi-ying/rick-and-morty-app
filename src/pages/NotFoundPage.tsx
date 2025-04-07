import { Link } from 'react-router-dom';

import { Button } from '../components/ui/button';

interface NotFoundPageProps {
  errorMessage?: string;
}

const NotFoundPage = ({ errorMessage }: NotFoundPageProps) => {
  return (
    <div className="flex h-[100vh] items-center justify-center p-4">
      <div className='grid gap-4'>
        <h1 className="text-slate-700 md:text-4xl">Oops!</h1>
        <h5 className="text-slate-500 md:text-xl">
          We couldn't find what you were looking for.
        </h5>
        <h5 className="text-slate-500">{errorMessage ? errorMessage : ""}</h5>
        <Link to="/">
          <Button>Go home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
