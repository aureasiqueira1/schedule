import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Trello from './pages/Trello';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Trello />} />

    </Routes>
  );
}

export default Router;