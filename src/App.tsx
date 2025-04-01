import './App.css';

import viteLogo from '/vite.svg';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import reactLogo from './assets/react.svg';

type Pagination = {
  info: {
    count: 826,
    pages: 42,
    next: "https://rickandmortyapi.com/api/character/?page=2",
    prev: null,
  },
}

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}


function App() {
  const [count, setCount] = useState(0);
  const { isPending, error, data } = useQuery<{results: Character[], infos: Pagination}>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://rickandmortyapi.com/api/character").then((res) =>
        res.json()
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        {data.results.map((item) => {
          return (
            <li key={item.id}>
              <ul>{item.id}</ul>
            </li>
          );
        })}
      </div>
    </>
  );
}

export default App;
