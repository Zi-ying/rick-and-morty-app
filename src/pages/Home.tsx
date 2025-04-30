import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className='h-screen'>
      <div className="h-[calc(100%-72px)] flex items-center justify-center">
        <Link to="/character">
          <Button>Get Started!</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
