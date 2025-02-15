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

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/author/:id" element={<Author />} />
            <Route path="/multimedia" element={<Multimedia />} />
            <Route path="/media/:id" element={<MediaDetailPage />} />
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