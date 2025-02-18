import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Author from "./pages/Author";
import Multimedia from "./pages/Multimedia";
import MediaDetailPage from './pages/MediaDetailPage';
import LoginPage from './pages/LoginPage'; // مسیر کامپوننت LoginPage
import SignupPage from './pages/SignupPage';

import Dashboard from './pages/Dashboard';
import Profile from './components/Profile';
import ArticleManagement from './pages/ArticleManagement';
import SubmitArticle from './pages/SubmitArticle';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/author/:id" element={<Author />} />
            <Route path="/multimedia" element={<Multimedia />} />
            <Route path="/media/:id" element={<MediaDetailPage />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="profile" element={<Profile user={{ name: 'علی', email: 'ali@example.com', bio: 'برنامه‌نویس' }} />} />
              {/* سایر صفحات فرعی */}
              <Route path="submit-article" element={<SubmitArticle />} />
              <Route path="article-management" element={<ArticleManagement />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;