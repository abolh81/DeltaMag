import React, { useState } from 'react';

function CommentSection() {
    const [comment, setComment] = useState(''); // متن کامنت
    const [isLoggedIn, setIsLoggedIn] = useState(true); // وضعیت ورود کاربر (فرضاً کاربر وارد شده)
    // setIsLoggedIn(true); // فرضاً کاربر وارد شده است
    const maxLength = 600; // حداکثر تعداد کاراکترها

    const handleCommentChange = (e) => {
        const inputText = e.target.value;
        if (inputText.length <= maxLength) {
            setComment(inputText);
        }
    };

    const handleSubmit = () => {
        if (comment.trim() === '') {
            alert('لطفاً متن کامنت را وارد کنید.');
            return;
        }
        alert(`کامنت شما ارسال شد:\n${comment}`);
        setComment(''); // پاک کردن متن کامنت پس از ارسال
    };

    return (
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">نظرات</h2>

            {/* اگر کاربر وارد نشده باشد */}
            {!isLoggedIn && (
                <div className="text-center py-4 text-gray-600 dark:text-gray-400">
                    برای ارسال نظر، لطفاً وارد سیستم شوید.
                </div>
            )}

            {/* اگر کاربر وارد شده باشد */}
            {isLoggedIn && (
                
                <div>
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="نظر خود را اینجا بنویسید..."
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        rows={4}
                        maxLength={maxLength}
                    />
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {comment.length}/{maxLength} کاراکتر
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        ارسال نظر
                    </button>
                </div>
            )}
        </div>
    );
}

export default CommentSection;