import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import Navigation from '@/features/navigation';

const Home = () => {
  return (
    <div className='h-screen'>
      <Navigation />
      <div className="h-[calc(100%-72px)] flex items-center justify-center">
        <Link to="/character">
          <Button>Get Started!</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
