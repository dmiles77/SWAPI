import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import SearchPage from './components/SearchPage';
import CategoryPage from './components/CategoryPage';
import TestingPage from './components/TestingPage';

const CategoryRouteWrapper: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  return <CategoryPage category={category?.toString() || ''} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<TestingPage />} /> {/* Default route */}
          <Route path="/search" element={<SearchPage />} /> {/* SearchPage moved to /search */}
          <Route path="/category/:category" element={<CategoryRouteWrapper />} />
        </Routes>
      </AppContextProvider>
    </Router>
  );
};

export default App;
