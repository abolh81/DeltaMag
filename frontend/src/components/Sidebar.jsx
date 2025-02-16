// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ userRole }) => {
    return (
        <div className="w-64 bg-gray-800 text-white h-screen p-4">
            <h2 className="text-2xl font-bold mb-6">داشبورد</h2>
            <ul>
                <li className="mb-2">
                    <Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
                        خانه
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/dashboard/articles" className="block p-2 hover:bg-gray-700 rounded">
                        ارسال مقاله
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/dashboard/comments" className="block p-2 hover:bg-gray-700 rounded">
                        نظرات
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/dashboard/saved" className="block p-2 hover:bg-gray-700 rounded">
                        مقالات ذخیره شده
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/dashboard/activity" className="block p-2 hover:bg-gray-700 rounded">
                        فعالیت‌ها
                    </Link>
                </li>
                {/* لینک‌های ویژه برای مدیران و ویراستاران */}
                {userRole === 'admin' && (
                    <li className="mb-2">
                        <Link to="/dashboard/stats" className="block p-2 hover:bg-gray-700 rounded">
                            آمار و مدیریت مقالات
                        </Link>
                    </li>
                )}
                {(userRole === 'editor' || userRole === 'graphic') && (
                    <li className="mb-2">
                        <Link to="/dashboard/manage-articles" className="block p-2 hover:bg-gray-700 rounded">
                            مدیریت مقالات
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;