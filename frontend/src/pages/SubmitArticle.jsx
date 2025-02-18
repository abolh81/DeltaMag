// pages/SubmitArticle.js
import React, { useState } from 'react';
import ArticleEditor from '../components/ArticleEditor';
import ArticleList from '../components/ArticleList';

const SubmitArticle = () => {
    const [articles, setArticles] = useState([]);
    const [showEditor, setShowEditor] = useState(false);

    const handleSaveArticle = (articleData) => {
        const newArticle = {
            id: articles.length + 1,
            title: articleData.title || 'مقاله بدون عنوان',
            topic: articleData.topic || 'بدون موضوع',
            content: articleData.content,
            date: new Date().toLocaleDateString('fa-IR'),
            status: 'در انتظار تایید سردبیر',
            image: articleData.image,
            file: articleData.file,
            video: articleData.video,
        };
        setArticles([...articles, newArticle]);
        setShowEditor(false); // بعد از ذخیره، ویرایشگر بسته شود
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">ارسال مقاله جدید</h1>

            {/* دکمه ایجاد مقاله جدید */}
            {!showEditor && (
                <button
                    onClick={() => setShowEditor(true)}
                    className="mb-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    مقاله جدید
                </button>
            )}

            {/* نمایش ویرایشگر اگر دکمه کلیک شده باشد */}
            {showEditor && (
                <ArticleEditor
                    onSave={handleSaveArticle}
                    onCancel={() => setShowEditor(false)} // اضافه کردن قابلیت لغو
                />
            )}

            {/* نمایش لیست مقالات کاربر در صورتی که ویرایشگر نمایش داده نشود */}
            {!showEditor && <ArticleList articles={articles} />}
        </div>
    );
};

export default SubmitArticle;