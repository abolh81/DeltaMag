// pages/ArticleManagement.js
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ArticleList from '../components/ArticleList';

const ArticleManagement = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([
        { id: 1, title: 'مقاله اول', content: 'این محتوای مقاله اول است.', date: '۱۴۰۲/۰۸/۰۱', status: 'تایید شده' },
        { id: 2, title: 'مقاله دوم', content: 'این محتوای مقاله دوم است.', date: '۱۴۰۲/۰۸/۰۲', status: 'در انتظار تایید' },
    ]);

    const userRole = 'user'; // یا 'admin', 'editor', 'graphic'

    const handleCreateArticle = (newArticle) => {
        setArticles([...articles, { ...newArticle, id: articles.length + 1, date: new Date().toLocaleDateString('fa-IR') }]);
        navigate('/dashboard/article-management');
    };

    const handleUpdateArticle = (updatedArticle) => {
        setArticles(articles.map((article) => (article.id === updatedArticle.id ? updatedArticle : article)));
        navigate('/dashboard/article-management');
    };

    return (
        <div>
            <ArticleList articles={articles} userRole={userRole} />
            <Outlet context={{ articles, onCreateArticle: handleCreateArticle, onUpdateArticle: handleUpdateArticle }} />
        </div>
    );
};

export default ArticleManagement;