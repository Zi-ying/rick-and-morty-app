import { Outlet } from 'react-router-dom';

const Layout = () => {
  return <div className="w-full min-h-screen text-center bg-[url(/public/rick-and-morty-wallpaper.jpg)] bg-fixed"><Outlet/></div>;
};

export default Layout;
