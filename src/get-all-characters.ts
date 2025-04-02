export const getAllCharacters = async () => {
  return await fetch("https://rickandmortyapi.com/api/character").then((res) =>
    res.json()
  );
};
