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
    <div className="text-white sticky left-0 top-0 z-20 flex px-2 bg-home">
      <Link to="/" className="flex-none">
        <img src={svg} alt="Rick and Morty" className="h-14" />
      </Link>
      <div className="hidden sm:flex justify-end gap-4 items-center grow">
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
      <div className="flex sm:hidden justify-end items-center w-full">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Menu className='ml-10'/>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="grid gap-1 bg-black">
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
