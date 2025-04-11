import { Outlet } from 'react-router-dom';

const Layout = () => {
  return <div className="w-full min-h-screen text-center bg-fixed"><Outlet/></div>;
};

export default Layout;
