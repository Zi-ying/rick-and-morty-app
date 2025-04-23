import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="w-full bg-home bg-fixed">
      <Outlet />
    </div>
  );
};

export default Layout;
