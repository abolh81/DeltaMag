import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSave, faLink } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons';
import CommentSection from '../components/CommentSection'; // مسیر کامپوننت

function calculateReadingTime(text) {
    const wordsPerMinute = 200; // تعداد کلمات در دقیقه
    const words = text.split(/\s+/).length; // شمارش تعداد کلمات
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} دقیقه خواندن`;
}

function MediaDetailPage() {
    const { id } = useParams();
    const [media, setMedia] = useState(null);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false); // وضعیت لایک
    const [saved, setSaved] = useState(false); // وضعیت ذخیره‌سازی
    const [shortLink, setShortLink] = useState(''); // لینک کوتاه
    const [likeCount, setLikeCount] = useState(0); // تعداد لایک‌ها

    useEffect(() => {
        const mediaData = [
            {
                id: 1,
                type: 'video',
                url: 'https://www.sample-videos.com/video123/mp4/480/asdasdas.mp4',
                title: 'نمونه ویدیو',
                description: 'این یک نمونه ویدیو است.',
                author: 'علی حسینی',
                date: '۱۴۰۲/۰۸/۰۱',
                likes: 120
            },
            {
                id: 2,
                type: 'podcast',
                url: 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3',
                title: 'نمونه پادکست',
                description: 'این یک نمونه پادکست است.',
                author: 'محمد توکلی',
                date: '۱۴۰۲/۰۸/۰۲',
                likes: 85
            }
        ];

        const foundMedia = mediaData.find(m => m.id === parseInt(id));
        if (foundMedia) {
            setMedia(foundMedia);
            setLikeCount(foundMedia.likes);
            setShortLink(window.location.href);

            // بررسی وضعیت لایک و ذخیره‌سازی از localStorage
            const likedStatus = localStorage.getItem(`media_${id}_liked`) === 'true';
            const savedStatus = localStorage.getItem(`media_${id}_saved`) === 'true';
            setLiked(likedStatus);
            setSaved(savedStatus);

            // اگر کاربر قبلاً لایک کرده بود، تعداد لایک‌ها رو افزایش بدید
            if (likedStatus) {
                setLikeCount(foundMedia.likes + 1);
            }
        } else {
            setError('رسانه مورد نظر یافت نشد.');
        }
    }, [id]);

    const handleLike = () => {
        const newLikedStatus = !liked;
        setLiked(newLikedStatus);
        localStorage.setItem(`media_${id}_liked`, newLikedStatus);

        // به‌روزرسانی تعداد لایک‌ها
        const newLikeCount = newLikedStatus ? likeCount + 1 : likeCount - 1;
        setLikeCount(newLikeCount);
    };

    const handleSave = () => {
        const newSavedStatus = !saved;
        setSaved(newSavedStatus);
        localStorage.setItem(`media_${id}_saved`, newSavedStatus);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortLink)
            .then(() => alert('لینک کپی شد!'))
            .catch(() => alert('خطا در کپی کردن لینک!'));
    };

    if (error) {
        return <div className="text-red-500 dark:text-red-400">{error}</div>;
    }

    if (!media) {
        return <div className="text-gray-700 dark:text-gray-300">در حال بارگذاری...</div>;
    }

    const readingTime = calculateReadingTime(media.description);

    return (
        <div className="container mx-auto p-4 dark:bg-gray-600">
            <div className="media shadow-lg p-6 rounded-lg bg-white dark:bg-gray-700">
                <div className="mb-8">
                    <ReactPlayer
                        url={media.url}
                        controls={true}
                        width='100%'
                        height='100%'
                    />
                </div>
                <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{media.title}</h1>
                <div className="text-gray-600 dark:text-gray-400 mb-8">
                    <div className='flex gap-4'>
                        <span className="mb-1">تاریخ: {media.date}</span>
                        <span>زمان مطالعه: {readingTime}</span>
                    </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{media.description}</p>

                {/* باکس اشتراک‌گذاری و لایک/ذخیره */}
                <div className="flex justify-between items-center border-b py-4 my-4 border-gray-300 dark:border-gray-600">
                    {/* آیکون‌های اشتراک‌گذاری */}
                    <div className="flex gap-4">
                        <a
                            href={`https://telegram.me/share/url?url=${window.location.href}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faTelegram} className="text-blue-500 dark:text-blue-400 text-2xl" />
                        </a>
                        <a
                            href={`https://api.whatsapp.com/send?text=${window.location.href}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 dark:text-green-400 text-2xl" />
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faTwitter} className="text-blue-400 dark:text-blue-300 text-2xl" />
                        </a>
                    </div>

                    {/* لایک و ذخیره */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleLike}
                            className={`flex items-center space-x-2 ${liked ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}
                        >
                            <FontAwesomeIcon icon={faHeart} />
                            <span>{likeCount}</span>
                        </button>
                        <button
                            onClick={handleSave}
                            className={`flex items-center space-x-2 ${saved ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                        >
                            <FontAwesomeIcon icon={faSave} />
                            <span>{saved ? 'ذخیره شد' : 'ذخیره'}</span>
                        </button>
                    </div>
                </div>

                {/* لینک کوتاه و دکمه کپی */}
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                        <div className="border p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                            <span className="text-gray-700 dark:text-gray-300">{shortLink}</span>
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            <FontAwesomeIcon icon={faLink} />
                            <span>کپی لینک</span>
                        </button>
                    </div>
                </div>

                {/* کامپوننت کامنت‌ها */}
                <div className="mt-8">
                    <CommentSection />
                </div>
            </div>
        </div>
    );
}

export default MediaDetailPage;