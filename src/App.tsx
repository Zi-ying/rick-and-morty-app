import { Route, Routes } from 'react-router-dom';

import Layout from '@/components/layout';
import CharacterPage from '@/pages/CharacterPage';
import CharactersPage from '@/pages/CharactersPage';
import Home from '@/pages/Home';
import LocationPage from '@/pages/LocationPage';
import LocationsPage from '@/pages/LocationsPage';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/character" element={<CharactersPage />} />
        <Route path="/character/:id" element={<CharacterPage />} />
        <Route path="/location" element={<LocationsPage />} />
        <Route path="/location/:id" element={<LocationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
