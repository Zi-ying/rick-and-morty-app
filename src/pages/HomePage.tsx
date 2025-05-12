import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div className="h-[calc(100vh-56px)] flex items-center justify-center">
      <Link to="/character">
        <Button>Get Started!</Button>
      </Link>
    </div>
  );
};

export default HomePage;
