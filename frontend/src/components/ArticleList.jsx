// components/ArticleList.js
import React from 'react';
import { Link } from 'react-router-dom';

const ArticleList = ({ articles, userRole }) => {
    return (
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">مقالات من</h2>
            <Link
                to="/dashboard/article-management/new"
                className="mb-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
                مقاله جدید
            </Link>
            <ul>
                {articles.map((article) => (
                    <li key={article.id} className="mb-4 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    تاریخ نوشتن: {article.date}
                                </p>
                            </div>
                            <div>
                                <Link
                                    to={`/dashboard/article-management/${article.id}`}
                                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    مشاهده/ویرایش
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticleList;