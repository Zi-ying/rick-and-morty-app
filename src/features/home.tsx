import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import Navigation from './navigation';

const Home = () => {
  return (
    <>
      <Navigation />
      <div className="grow flex items-center justify-center">
        <Link to="/character">
          <Button>Get Started!</Button>
        </Link>
      </div>
    </>
  );
};

export default Home;
