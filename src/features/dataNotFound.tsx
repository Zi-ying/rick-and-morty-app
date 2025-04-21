import oops from '@/assets/oops.svg';

const DataNotFound = () => {
  return (
    <div className="flex flex-col gap-2 items-center bg-green-500">
      <img
        src={oops}
        alt="Oops"
        className="bg-green-400 max-h-96"
      />
      <div className="bg-green-400">No results found</div>
      <div className="bg-green-400">
        We could not find what you searched for.
      </div>
      <div className="bg-green-400">Try searching again.</div>
    </div>
  );
};

export default DataNotFound;
