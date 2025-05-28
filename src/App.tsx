import { Route, Routes } from 'react-router-dom';

import Layout from '@/components/layout';
import CharacterPage from '@/pages/CharacterPage';
import CharactersPage from '@/pages/CharactersPage';
import EpisodePage from '@/pages/EpisodePage';
import EpisodesPage from '@/pages/EpisodesPage';
import FavoritePage from '@/pages/FavoritePage';
import HomePage from '@/pages/HomePage';
import LocationPage from '@/pages/LocationPage';
import LocationsPage from '@/pages/LocationsPage';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="character" element={<CharactersPage />} />
        <Route path="character/:characterId" element={<CharacterPage />} />
        <Route path="favorite" element={<FavoritePage />} />
        <Route path="location" element={<LocationsPage />} />
        <Route path="location/:locationId" element={<LocationPage />} />
        <Route path="episode" element={<EpisodesPage />} />
        <Route path="episode/:episodeId" element={<EpisodePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
