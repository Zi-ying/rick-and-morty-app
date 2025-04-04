import { Outlet } from 'react-router-dom';

const Layout = () => {
  return <div className="w-full h-full text-center"><Outlet/></div>;
};

export default Layout;
