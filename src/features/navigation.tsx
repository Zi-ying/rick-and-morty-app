const Navigation = () => {
  const image = "../../public/rick-and-morty.svg";

  return (
    <div className="text-white md:sticky left-0 top-0">
      <div className="grid grid-cols-2 bg-red-700">
        <img src={image} alt="" className="h-20 bg-red-500" />
        <div className="bg-red-500">Navigation</div>
      </div>
    </div>
  );
};

export default Navigation;
