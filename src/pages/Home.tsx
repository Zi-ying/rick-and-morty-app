import { Link } from 'react-router-dom';

import { Button } from '../components/ui/button';

const Home = () => {
  const image = '../../rick-and-morty.svg'


  return (
    <div className='h-screen flex flex-col items-center justify-center bg-[url(/public/rick-and-morty-wallpaper.jpg)]'>
      <img src={image}/>
      <Link to='/character'>
        <Button>Get Started!</Button>
      </Link>
    </div>
  );
};

export default Home;
