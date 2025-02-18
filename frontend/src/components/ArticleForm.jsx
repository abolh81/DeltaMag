// components/ArticleForm.js
import React, { useState } from 'react';

const ArticleForm = ({ article, onSubmit }) => {
    const [title, setTitle] = useState(article?.title || '');
    const [topic, setTopic] = useState(article?.topic || '');
    const [content, setContent] = useState(article?.content || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, topic, content });
    };

    return (
        <div className="mt-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                {article ? 'ویرایش مقاله' : 'مقاله جدید'}
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        عنوان مقاله
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-100"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        موضوع مقاله
                    </label>
                    <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-100"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        متن مقاله
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-100"
                        rows="10"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {article ? 'ذخیره تغییرات' : 'ایجاد مقاله'}
                </button>
            </form>
        </div>
    );
};

export default ArticleForm;