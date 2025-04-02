import CharactersList from './CharactersList';

const Home = () => {
  return (
    <div className='text-gray-700 grid gap-4'>
      <div className='text-sm md:text-2xl'>Character's list from Rick and Morty</div>
      <CharactersList />
    </div>
  )
}

export default Home;
