// pages/Dashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';


const Dashboard = () => {
    // نقش کاربر را از Firebase یا state مدیریت کنید
    const userRole = 'admin'; // یا 'admin', 'editor', 'graphic'

    return (
        <div className="flex">
            <Sidebar userRole={userRole} />
            <div className="flex-1 p-6">
                <Outlet /> {/* محتوای صفحات فرعی اینجا نمایش داده می‌شود */}
            </div>
        </div>
    );
};

export default Dashboard;