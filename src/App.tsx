import './App.css';

import { Route, Routes } from 'react-router-dom';

import Character from './Character';
import Home from './Home';
import Layout from './Layout';
import NotFoundPage from './NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Character />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
