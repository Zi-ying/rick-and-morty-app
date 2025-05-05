const ResultsNotFound = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="grid gap-4 justify-items-center p-4 backdrop-blur-xs rounded-xl m-auto backdrop-brightness-80">
        <h1 className="text-pickle-500 text-9xl">Oops!</h1>
        <h5 className="text-white text-5xl">No results found</h5>
        <h5 className="text-white text-4xl">
          We could not find what you searched for.
        </h5>
        <h5 className="text-white text-3xl contrast-200">Try searching again.</h5>
      </div>
    </div>
  );
};

export default ResultsNotFound;
