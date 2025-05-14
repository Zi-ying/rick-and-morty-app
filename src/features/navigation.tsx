import { Link, useLocation } from 'react-router-dom';

import svg from '@/assets/rick-and-morty.svg';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();

  const locationOptions = [
    {
      value: "/",
      label: "Home",
    },
    {
      value: "/character",
      label: "Characters",
    },
    {
      value: "/location",
      label: "Locations",
    },
    {
      value: "/episode",
      label: "Episodes",
    },
  ];

  return (
    <div className="text-white sm:sticky left-0 top-0 shadow-2xl z-10 bg-home flex px-2">
      <Link to="/" className="flex-none">
        <img src={svg} alt="Rick and Morty" className="h-14" />
      </Link>
      <div className="flex justify-end gap-4 items-center grow">
        {locationOptions.map((option, index) => {
          return (
            <Link
              key={index}
              to={option.value}
              className={cn(
                "hover:text-pickle-500 hover:underline underline-offset-8 py-4",
                location.pathname === option.value && "underline"
              )}
            >
              <p>{option.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
