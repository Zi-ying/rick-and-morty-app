import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import svg from '@/assets/rick-and-morty.svg';
import { cn } from '@/lib/utils';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../components/ui/navigation-menu';

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
    <div className="text-white sticky left-0 top-0 shadow-2xl z-10 bg-home flex px-2">
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
      <div className="flex sm:hidden justify-end gap-4 items-center grow">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Menu />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {locationOptions.map((option, index) => {
                  const isActive = location.pathname === option.value;
                  return (
                    <NavigationMenuLink
                      key={index}
                      href={option.value}
                      className={cn(
                        "hover:text-pickle-500 hover:underline underline-offset-4",
                        isActive && "underline"
                      )}
                    >
                      {option.label}
                    </NavigationMenuLink>
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
