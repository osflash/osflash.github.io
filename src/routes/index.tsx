import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';

const routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
