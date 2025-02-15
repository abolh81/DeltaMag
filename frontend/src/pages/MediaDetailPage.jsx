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
                description: `
                    ریاضیات به عنوان یکی از قدیمی‌ترین و بنیادی‌ترین علوم، همواره نقش کلیدی در پیشرفت تمدن بشری ایفا کرده است. امروزه، ریاضیات نه تنها به عنوان یک علم نظری، بلکه به عنوان ابزاری قدرتمند در حل مسائل پیچیده دنیای واقعی مورد استفاده قرار می‌گیرد. در اینجا به برخی از موضوعات روز ریاضیات که در حال حاضر مورد توجه دانشمندان و محققان هستند، می‌پردازیم.
    
                    ۱. **هوش مصنوعی و یادگیری ماشین**: هوش مصنوعی و یادگیری ماشین از جمله حوزه‌هایی هستند که به شدت به ریاضیات وابسته‌اند. الگوریتم‌های یادگیری ماشین بر پایه مفاهیمی مانند جبر خطی، آمار و احتمال، و بهینه‌سازی کار می‌کنند. برای مثال، شبکه‌های عصبی مصنوعی که در یادگیری عمیق استفاده می‌شوند، بر اساس محاسبات ماتریسی و توابع فعال‌سازی پیاده‌سازی می‌شوند. ریاضیات به ما کمک می‌کند تا مدل‌های هوش مصنوعی را طراحی، آموزش و ارزیابی کنیم.
    
                    ۲. **رمزنگاری و امنیت داده‌ها**: با افزایش استفاده از فناوری‌های دیجیتال، امنیت داده‌ها به یکی از چالش‌های بزرگ تبدیل شده است. ریاضیات نقش اساسی در توسعه الگوریتم‌های رمزنگاری ایفا می‌کند. برای مثال، الگوریتم‌های رمزنگاری کلید عمومی مانند RSA بر پایه نظریه اعداد و محاسبات مدولار کار می‌کنند. این الگوریتم‌ها از داده‌های حساس در برابر دسترسی غیرمجاز محافظت می‌کنند.
    
                    ۳. **علوم داده و تحلیل کلان‌داده‌ها**: با رشد روزافزون داده‌ها در دنیای دیجیتال، علوم داده به یکی از حوزه‌های پرکاربرد ریاضیات تبدیل شده است. تحلیل کلان‌داده‌ها نیازمند استفاده از روش‌های آماری، جبر خطی و بهینه‌سازی است. ریاضیات به ما کمک می‌کند تا الگوهای پنهان در داده‌ها را کشف کرده و تصمیم‌گیری‌های بهتری انجام دهیم.
    
                    ۴. **ریاضیات مالی**: ریاضیات مالی یکی از حوزه‌های کاربردی ریاضیات است که به مدل‌سازی بازارهای مالی و مدیریت ریسک می‌پردازد. معادلات دیفرانسیل، فرآیندهای تصادفی و نظریه احتمال از جمله ابزارهای ریاضی هستند که در این حوزه استفاده می‌شوند. برای مثال، مدل بلک-شولز برای قیمت‌گذاری اختیار معامله‌ها از معادلات دیفرانسیل جزئی استفاده می‌کند.
    
                    ۵. **ریاضیات زیستی**: ریاضیات زیستی به مطالعه سیستم‌های زیستی با استفاده از مدل‌های ریاضی می‌پردازد. این حوزه شامل موضوعاتی مانند مدل‌سازی رشد تومورها، انتشار بیماری‌ها و دینامیک جمعیت‌ها است. معادلات دیفرانسیل و سیستم‌های دینامیکی از جمله ابزارهای اصلی در این حوزه هستند.
    
                    ۶. **نظریه اعداد و رمزنگاری کوانتومی**: با ظهور کامپیوترهای کوانتومی، نظریه اعداد و رمزنگاری کوانتومی به یکی از موضوعات داغ در ریاضیات تبدیل شده است. کامپیوترهای کوانتومی می‌توانند برخی از الگوریتم‌های رمزنگاری کلاسیک را به راحتی بشکنند. بنابراین، توسعه الگوریتم‌های رمزنگاری مقاوم در برابر حملات کوانتومی به یک چالش بزرگ تبدیل شده است.
    
                    ۷. **توپولوژی و هندسه جبری**: توپولوژی و هندسه جبری از جمله حوزه‌های پیشرفته ریاضیات هستند که کاربردهای گسترده‌ای در فیزیک نظری، علوم کامپیوتر و حتی زیست‌شناسی دارند. برای مثال، توپولوژی در مطالعه ساختارهای فضایی و هندسه جبری در رمزنگاری و گرافیک کامپیوتری استفاده می‌شود.
    
                    ریاضیات به عنوان زبانی جهانی، نه تنها به درک بهتر جهان کمک می‌کند، بلکه ابزاری قدرتمند برای حل مسائل پیچیده و بهبود کیفیت زندگی است. با ادامه پیشرفت‌ها در این حوزه، می‌توانیم شاهد نوآوری‌های بیشتری در آینده باشیم.
                `,
                author: 'علی حسینی',
                date: '۱۴۰۲/۰۸/۰۱',
                likes: 120
            },
            {
                id: 2,
                type: 'podcast',
                url: 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3',
                title: 'نمونه پادکست',
                description: `
                    ریاضیات به عنوان یکی از قدیمی‌ترین و بنیادی‌ترین علوم، همواره نقش کلیدی در پیشرفت تمدن بشری ایفا کرده است. امروزه، ریاضیات نه تنها به عنوان یک علم نظری، بلکه به عنوان ابزاری قدرتمند در حل مسائل پیچیده دنیای واقعی مورد استفاده قرار می‌گیرد. در اینجا به برخی از موضوعات روز ریاضیات که در حال حاضر مورد توجه دانشمندان و محققان هستند، می‌پردازیم.
    
                    ۱. **هوش مصنوعی و یادگیری ماشین**: هوش مصنوعی و یادگیری ماشین از جمله حوزه‌هایی هستند که به شدت به ریاضیات وابسته‌اند. الگوریتم‌های یادگیری ماشین بر پایه مفاهیمی مانند جبر خطی، آمار و احتمال، و بهینه‌سازی کار می‌کنند. برای مثال، شبکه‌های عصبی مصنوعی که در یادگیری عمیق استفاده می‌شوند، بر اساس محاسبات ماتریسی و توابع فعال‌سازی پیاده‌سازی می‌شوند. ریاضیات به ما کمک می‌کند تا مدل‌های هوش مصنوعی را طراحی، آموزش و ارزیابی کنیم.
    
                    ۲. **رمزنگاری و امنیت داده‌ها**: با افزایش استفاده از فناوری‌های دیجیتال، امنیت داده‌ها به یکی از چالش‌های بزرگ تبدیل شده است. ریاضیات نقش اساسی در توسعه الگوریتم‌های رمزنگاری ایفا می‌کند. برای مثال، الگوریتم‌های رمزنگاری کلید عمومی مانند RSA بر پایه نظریه اعداد و محاسبات مدولار کار می‌کنند. این الگوریتم‌ها از داده‌های حساس در برابر دسترسی غیرمجاز محافظت می‌کنند.
    
                    ۳. **علوم داده و تحلیل کلان‌داده‌ها**: با رشد روزافزون داده‌ها در دنیای دیجیتال، علوم داده به یکی از حوزه‌های پرکاربرد ریاضیات تبدیل شده است. تحلیل کلان‌داده‌ها نیازمند استفاده از روش‌های آماری، جبر خطی و بهینه‌سازی است. ریاضیات به ما کمک می‌کند تا الگوهای پنهان در داده‌ها را کشف کرده و تصمیم‌گیری‌های بهتری انجام دهیم.
    
                    ۴. **ریاضیات مالی**: ریاضیات مالی یکی از حوزه‌های کاربردی ریاضیات است که به مدل‌سازی بازارهای مالی و مدیریت ریسک می‌پردازد. معادلات دیفرانسیل، فرآیندهای تصادفی و نظریه احتمال از جمله ابزارهای ریاضی هستند که در این حوزه استفاده می‌شوند. برای مثال، مدل بلک-شولز برای قیمت‌گذاری اختیار معامله‌ها از معادلات دیفرانسیل جزئی استفاده می‌کند.
    
                    ۵. **ریاضیات زیستی**: ریاضیات زیستی به مطالعه سیستم‌های زیستی با استفاده از مدل‌های ریاضی می‌پردازد. این حوزه شامل موضوعاتی مانند مدل‌سازی رشد تومورها، انتشار بیماری‌ها و دینامیک جمعیت‌ها است. معادلات دیفرانسیل و سیستم‌های دینامیکی از جمله ابزارهای اصلی در این حوزه هستند.
    
                    ۶. **نظریه اعداد و رمزنگاری کوانتومی**: با ظهور کامپیوترهای کوانتومی، نظریه اعداد و رمزنگاری کوانتومی به یکی از موضوعات داغ در ریاضیات تبدیل شده است. کامپیوترهای کوانتومی می‌توانند برخی از الگوریتم‌های رمزنگاری کلاسیک را به راحتی بشکنند. بنابراین، توسعه الگوریتم‌های رمزنگاری مقاوم در برابر حملات کوانتومی به یک چالش بزرگ تبدیل شده است.
    
                    ۷. **توپولوژی و هندسه جبری**: توپولوژی و هندسه جبری از جمله حوزه‌های پیشرفته ریاضیات هستند که کاربردهای گسترده‌ای در فیزیک نظری، علوم کامپیوتر و حتی زیست‌شناسی دارند. برای مثال، توپولوژی در مطالعه ساختارهای فضایی و هندسه جبری در رمزنگاری و گرافیک کامپیوتری استفاده می‌شود.
    
                    ریاضیات به عنوان زبانی جهانی، نه تنها به درک بهتر جهان کمک می‌کند، بلکه ابزاری قدرتمند برای حل مسائل پیچیده و بهبود کیفیت زندگی است. با ادامه پیشرفت‌ها در این حوزه، می‌توانیم شاهد نوآوری‌های بیشتری در آینده باشیم.
                `,
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
                <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">{media.description}</p>

                {/* باکس اشتراک‌گذاری و لایک/ذخیره */}
                <div className="flex justify-between items-center border-b py-4 my-4 border-gray-300 dark:border-gray-600">
                    {/* آیکون‌های اشتراک‌گذاری */}
                    <div className="flex gap-4">
                        <a
                            href={`https://telegram.me/share/url?url=${window.location.href}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faTelegram} className="text-blue-500 dark:text-blue-400 text-3xl" />
                        </a>
                        <a
                            href={`https://api.whatsapp.com/send?text=${window.location.href}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 dark:text-green-400 text-3xl" />
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faTwitter} className="text-blue-400 dark:text-blue-300 text-3xl" />
                        </a>
                    </div>

                    {/* لایک و ذخیره */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                liked ? 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20' : 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700'
                            }`}
                        >
                            <span className="text-lg">{likeCount}</span>
                            <FontAwesomeIcon icon={faHeart} className="text-xl" />
                        </button>
                        <button
                            onClick={handleSave}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                saved ? 'text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700'
                            }`}
                        >
                            <span className="text-lg">{saved ? 'ذخیره شد' : 'ذخیره'}</span>
                            <FontAwesomeIcon icon={faSave} className="text-xl" />
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
                            className="flex items-center gap-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            <FontAwesomeIcon icon={faLink} className="text-xl" />
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