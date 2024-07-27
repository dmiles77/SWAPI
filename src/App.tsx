import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';
import SearchPage from './components/SearchPage';
import CategoryPage from './components/CategoryPage';

const App: React.FC = () => {
  return (
    <Router>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/category/people" element={<CategoryPage category='people' />} />
          <Route path="/category/:category" element={<div>Category Page</div>} />
        </Routes>
      </SearchProvider>
    </Router>
  );
};

export default App;
