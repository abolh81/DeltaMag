// pages/Dashboard.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';


const Dashboard = () => {
    // نقش کاربر را از Firebase یا state مدیریت کنید
    const userRole = 'user'; // یا 'admin', 'editor', 'graphic'

    return (
        <div className="flex">
            <Sidebar userRole={userRole} />
            <div className="flex-1 p-6">
                <Profile user={{ name: 'علی', email: 'ali@example.com', bio: 'برنامه‌نویس' }}/>
            </div>
        </div>
    );
};

export default Dashboard;