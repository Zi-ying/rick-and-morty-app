import { Outlet } from 'react-router-dom';

import Navigation from '@/features/navigation';

const Layout = () => {
  return (
    <div className="w-full bg-home bg-fixed h-full">
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Layout;
