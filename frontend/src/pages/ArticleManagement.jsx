// pages/ArticleManagement.js
import React, { useState } from 'react';
import ArticleList from '../components/ArticleList';

const ArticleManagement = () => {
    const [articles, setArticles] = useState([]);
    setArticles([
        { id: 1, title: 'مقاله اول', topic: 'علمی', content: 'این محتوای مقاله اول است.', date: '۱۴۰۲/۰۸/۰۱', status: 'تایید شده' },
        { id: 2, title: 'مقاله دوم', topic: 'تکنولوژی', content: 'این محتوای مقاله دوم است.', date: '۱۴۰۲/۰۸/۰۲', status: 'در حال ویراستاری' },
    ]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">مدیریت مقالات</h2>
            <ArticleList articles={articles} />
        </div>
    );
};

export default ArticleManagement;