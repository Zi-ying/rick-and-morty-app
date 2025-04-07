import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
import CharacterPage from './pages/CharacterPage';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CharacterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
