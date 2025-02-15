import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MediaPage() {
    const initialMediaList = [
        {
            id: 1,
            type: 'video',
            poster: 'https://example.com/video-poster.jpg',
            title: 'نمونه ویدیو',
            description: 'این یک نمونه ویدیو است.'
        },
        {
            id: 2,
            type: 'podcast',
            poster: 'https://example.com/podcast-poster.jpg',
            title: 'نمونه پادکست',
            description: 'این یک نمونه پادکست است.'
        }
    ];

    const [mediaList] = useState(initialMediaList);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">رسانه‌های دریافت‌شده</h1>
            <div className="space-y-8">
                {mediaList.map(media => (
                    <div key={media.id} className="media shadow-lg p-6 rounded-lg bg-white dark:bg-gray-800">
                        <img src={media.poster} alt={media.title} className="w-full mb-4 rounded" />
                        <Link to={`/media/${media.id}`}>
                            <h2 className="text-xl font-semibold mb-2 text-blue-500 dark:text-blue-300 hover:underline">{media.title}</h2>
                        </Link>
                        <p className="text-gray-700 dark:text-white">{media.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MediaPage;