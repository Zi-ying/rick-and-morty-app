import { useQuery } from '@tanstack/react-query';

type Pagination = {
  info: {
    count: 826;
    pages: 42;
    next: "https://rickandmortyapi.com/api/character/?page=2";
    prev: null;
  };
};

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
};

const CharactersList = () => {
  const { isPending, error, data } = useQuery<{
    results: Character[];
    infos: Pagination;
  }>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://rickandmortyapi.com/api/character").then((res) =>
        res.json()
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className='w-full'>
      {data.results.map((item) => {
        return (
          <li key={item.id}>
            <ul>{item.id}</ul>
          </li>
        );
      })}
    </div>
  );
};

export default CharactersList;
