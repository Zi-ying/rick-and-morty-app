import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import svg from '@/assets/rick-and-morty.svg';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

interface NavigationProps {
  children?: React.ReactNode;
}

const Navigation = ({ children }: NavigationProps) => {
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
    {
      value: "/favorite",
      label: "Favorites",
    },
  ];

  return (
    <div className="text-white px-2 grid grid-cols-3 items-center">
      <Link to="/" className="flex-none">
        <img src={svg} alt="Rick and Morty" className="h-14 col-span-1" />
      </Link>
      <div>{children}</div>
      <div className="hidden lg:flex justify-end gap-4 items-center">
        {locationOptions.map((option, index) => {
          const isActive = location.pathname === option.value;
          return (
            <Link
              key={index}
              to={option.value}
              className={cn(
                "hover:text-pickle-500 hover:underline underline-offset-8 py-4",
                isActive && "underline"
              )}
            >
              <p>{option.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="flex lg:hidden justify-end items-center w-full z-10">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Menu className="ml-10" />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="grid gap-1 backdrop-blur-lg">
                {locationOptions.map((option, index) => {
                  const isActive = location.pathname === option.value;
                  return (
                    <Link key={index} to={option.value}>
                      <p
                        className={cn(
                          "hover:text-pickle-500 hover:underline underline-offset-4",
                          isActive && "underline"
                        )}
                      >
                        {option.label}
                      </p>
                    </Link>
                  );
                })}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Navigation;
