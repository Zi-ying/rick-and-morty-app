import { Link } from 'react-router-dom';

import image from '@/assets/rick-and-morty.svg';
import { Button } from '@/components/ui/button';

const Home = () => {

  return (
    <div className="z-10 h-screen flex flex-col items-center justify-center bg-home">
      <img src={image} alt='Rick and Morty'/>
      <Link to='/character'>
        <Button>Get Started!</Button>
      </Link>
    </div>
  );
};

export default Home;
