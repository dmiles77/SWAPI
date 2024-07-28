import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import SearchPage from './components/SearchPage';
import CategoryPage from './components/CategoryPage';

const CategoryRouteWrapper: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  return <CategoryPage category={category?.toString() || ''} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/category/:category" element={<CategoryRouteWrapper />} />
        </Routes>
      </AppContextProvider>
    </Router>
  );
};

export default App;
