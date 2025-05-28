import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="w-full bg-home bg-fixed h-screen flex flex-col">
      <Outlet />
    </div>
  );
};

export default Layout;
