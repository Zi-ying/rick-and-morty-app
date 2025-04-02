import './App.css';

import { Route, Routes } from 'react-router-dom';

import CharactersList from './CharactersList';
import Layout from './Layout';
import NotFoundPage from './NotFoundPage';

function App() {
  return (
     <Routes>
      <Route element={<Layout />}>
      <Route
        path="/"
        element={<CharactersList />}
        />
      <Route path="*" element={<NotFoundPage />} />
        </Route>
    </Routes>
  );
}

export default App;
