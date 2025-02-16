import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Author from "./pages/Author";
import Multimedia from "./pages/Multimedia";
import MediaDetailPage from './pages/MediaDetailPage';
import JournalManagement from "./pages/JournalManagement";
import UploadArticle from "./pages/UploadArticle";
import LoginPage from './pages/LoginPage'; // مسیر کامپوننت LoginPage
import SignupPage from './pages/SignupPage';

import Dashboard from './pages/Dashboard';
import Profile from './components/Profile';
import ArticleManagement from './pages/ArticleManagement';
import ArticleForm from './components/ArticleForm';

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
              <Route path="article-management" element={<ArticleManagement />}>
                <Route path="new" element={<ArticleForm />} />
                <Route path=":id/edit" element={<ArticleForm />} />
              </Route>
            </Route>
            <Route path="/journal-management" element={<JournalManagement />} />
            <Route path="/upload-article" element={<UploadArticle />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;