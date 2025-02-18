// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ userRole }) => {
    return (
        <div className="w-64 bg-gray-800 text-white h-screen p-4">
            <h2 className="text-2xl font-bold mb-6">داشبورد</h2>
            <ul>
                {/* لینک‌های مشترک برای همه کاربران */}
                <li className="mb-2">
                    <Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
                        خانه
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/dashboard/submit-article" className="block p-2 hover:bg-gray-700 rounded">
                        ارسال مقاله
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/dashboard/saved-articles" className="block p-2 hover:bg-gray-700 rounded">
                        مقالات ذخیره شده
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/dashboard/activity" className="block p-2 hover:bg-gray-700 rounded">
                        فعالیت‌ها
                    </Link>
                </li>

                {/* لینک‌های ویژه برای مدیران */}
                {userRole === 'admin' && (
                    <li className="mb-2">
                        <Link to="/dashboard/article-management" className="block p-2 hover:bg-gray-700 rounded">
                            آمار و مدیریت مقالات
                        </Link>
                    </li>
                )}

                {/* لینک‌های ویژه برای ویراستاران و اعضای تیم گرافیک */}
                {(userRole === 'editor' || userRole === 'graphic') && (
                    <li className="mb-2">
                        <Link to="/dashboard/article-management" className="block p-2 hover:bg-gray-700 rounded">
                            مدیریت مقالات
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;