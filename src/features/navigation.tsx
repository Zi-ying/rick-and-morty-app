import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import svg from '@/assets/rick-and-morty.svg';
import { cn } from '@/lib/utils';

interface NavigationProps {
  children?: ReactNode;
}

const Navigation = ({ children }: NavigationProps) => {
  const location = useLocation();

  return (
    <div className="text-white sm:sticky left-0 top-0 shadow-2xl">
      <div className="grid grid-cols-2 p-2">
        <Link to='/'>
          <img src={svg} alt="Rick and Morty" className="h-14" />
        </Link>
        <div className=" flex justify-end gap-4 items-center">
          <Link
            to="/"
            className={cn(
              "hover:text-pickle-500 hover:underline py-4",
              location.pathname === "/" ? "underline" : ""
            )}
          >
            Home
          </Link>
          <Link
            to="/character"
            className={cn(
              "hover:text-pickle-500 hover:underline py-4",
              location.pathname === "/character" ? "underline" : ""
            )}
          >
            Characters
          </Link>
          <Link
            to="/location"
            className={cn(
              "hover:text-pickle-500 hover:underline py-4",
              location.pathname === "/location" ? "underline" : ""
            )}
          >
            Locations
          </Link>
          <Link
            to="/episode"
            className={cn(
              "hover:text-pickle-500 hover:underline py-4",
              location.pathname === "/episode" ? "underline" : ""
            )}
          >
            Episodes
          </Link>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Navigation;
