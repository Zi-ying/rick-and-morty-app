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
    <div className="text-white md:sticky left-0 top-0">
      <div className="grid grid-cols-2 p-2 bg-red-700">
        <img src={svg} alt="Rick and Morty" className="h-14 bg-red-500" />
        <div className="bg-red-500 flex justify-end gap-4 items-center">
          <Link to="/">
            <div className="bg-red-300">Home</div>
          </Link>
          <Link to="/character">
            <div
              className={cn(
                "bg-red-300",
                location.pathname === "/character" ? "underline" : ""
              )}
            >
              Characters
            </div>
          </Link>
          <Link to="/location">
            <div
              className={cn(
                "bg-red-300",
                location.pathname === "/location" ? "underline" : ""
              )}
            >
              Locations
            </div>
          </Link>
          <Link to="/episode">
            <div
              className={cn(
                "bg-red-300",
                location.pathname === "/episode" ? "underline" : ""
              )}
            >
              Episodes
            </div>
          </Link>
        </div>
      </div>
      <div className="bg-red-700">{children}</div>
    </div>
  );
};

export default Navigation;
