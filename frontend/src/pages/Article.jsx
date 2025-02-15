import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // اضافه کردن Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSave, faLink } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons';
import CommentSection from '../components/CommentSection'; // مسیر کامپوننت

// آیکون‌های مربوط به نوع مقاله
const articleTypeIcons = {
    'تاریخ ریاضیات': 'history',
    'فلسفه ریاضیات': 'atom',
    'ریاضیات کودک': 'child',
    'هندسه': 'shapes',
    'جبر': 'square-root-alt',
};

function calculateReadingTime(text) {
    const wordsPerMinute = 200; // تعداد کلمات در دقیقه
    const words = text.split(/\s+/).length; // شمارش تعداد کلمات
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} دقیقه `;
}

function ArticleDetailPage() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false); // وضعیت لایک
    const [saved, setSaved] = useState(false); // وضعیت ذخیره‌سازی
    const [shortLink, setShortLink] = useState(''); // لینک کوتاه
    const [likeCount, setLikeCount] = useState(0); // تعداد لایک‌ها

    useEffect(() => {
        const articleData = [
            {
                id: 1,
                type: 'تاریخ ریاضیات',
                title: 'نمونه مقاله',
                description: `
                    ریاضیات به عنوان یکی از قدیمی‌ترین و بنیادی‌ترین علوم، همواره نقش کلیدی در پیشرفت تمدن بشری ایفا کرده است. امروزه، ریاضیات نه تنها به عنوان یک علم نظری، بلکه به عنوان ابزاری قدرتمند در حل مسائل پیچیده دنیای واقعی مورد استفاده قرار می‌گیرد. در اینجا به برخی از موضوعات روز ریاضیات که در حال حاضر مورد توجه دانشمندان و محققان هستند، می‌پردازیم.

                    ۱. **هوش مصنوعی و یادگیری ماشین**: هوش مصنوعی و یادگیری ماشین از جمله حوزه‌هایی هستند که به شدت به ریاضیات وابسته‌اند. الگوریتم‌های یادگیری ماشین بر پایه مفاهیمی مانند جبر خطی، آمار و احتمال، و بهینه‌سازی کار می‌کنند. برای مثال، شبکه‌های عصبی مصنوعی که در یادگیری عمیق استفاده می‌شوند، بر اساس محاسبات ماتریسی و توابع فعال‌سازی پیاده‌سازی می‌شوند. ریاضیات به ما کمک می‌کند تا مدل‌های هوش مصنوعی را طراحی، آموزش و ارزیابی کنیم.

                    ۲. **رمزنگاری و امنیت داده‌ها**: با افزایش استفاده از فناوری‌های دیجیتال، امنیت داده‌ها به یکی از چالش‌های بزرگ تبدیل شده است. ریاضیات نقش اساسی در توسعه الگوریتم‌های رمزنگاری ایفا می‌کند. برای مثال، الگوریتم‌های رمزنگاری کلید عمومی مانند RSA بر پایه نظریه اعداد و محاسبات مدولار کار می‌کنند. این الگوریتم‌ها از داده‌های حساس در برابر دسترسی غیرمجاز محافظت می‌کنند.
                `,
                author: {
                    id: 1, // شناسه نویسنده
                    name: 'علی حسینی',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png', // لینک عکس نویسنده
                },
                image: 'https://via.placeholder.com/800x400', // لینک عکس مقاله
                date: '۱۴۰۲/۰۸/۰۱',
                likes: 120
            },
            {
                id: 2,
                type: 'ریاضیات کودک',
                title: 'نمونه مقاله دوم',
                description: `
                    ریاضیات به عنوان یکی از قدیمی‌ترین و بنیادی‌ترین علوم، همواره نقش کلیدی در پیشرفت تمدن بشری ایفا کرده است. امروزه، ریاضیات نه تنها به عنوان یک علم نظری، بلکه به عنوان ابزاری قدرتمند در حل مسائل پیچیده دنیای واقعی مورد استفاده قرار می‌گیرد. در اینجا به برخی از موضوعات روز ریاضیات که در حال حاضر مورد توجه دانشمندان و محققان هستند، می‌پردازیم.

                    ۱. **هوش مصنوعی و یادگیری ماشین**: هوش مصنوعی و یادگیری ماشین از جمله حوزه‌هایی هستند که به شدت به ریاضیات وابسته‌اند. الگوریتم‌های یادگیری ماشین بر پایه مفاهیمی مانند جبر خطی، آمار و احتمال، و بهینه‌سازی کار می‌کنند. برای مثال، شبکه‌های عصبی مصنوعی که در یادگیری عمیق استفاده می‌شوند، بر اساس محاسبات ماتریسی و توابع فعال‌سازی پیاده‌سازی می‌شوند. ریاضیات به ما کمک می‌کند تا مدل‌های هوش مصنوعی را طراحی، آموزش و ارزیابی کنیم.

                    ۲. **رمزنگاری و امنیت داده‌ها**: با افزایش استفاده از فناوری‌های دیجیتال، امنیت داده‌ها به یکی از چالش‌های بزرگ تبدیل شده است. ریاضیات نقش اساسی در توسعه الگوریتم‌های رمزنگاری ایفا می‌کند. برای مثال، الگوریتم‌های رمزنگاری کلید عمومی مانند RSA بر پایه نظریه اعداد و محاسبات مدولار کار می‌کنند. این الگوریتم‌ها از داده‌های حساس در برابر دسترسی غیرمجاز محافظت می‌کنند.

                    ۳. **علوم داده و تحلیل کلان‌داده‌ها**: با رشد روزافزون داده‌ها در دنیای دیجیتال، علوم داده به یکی از حوزه‌های پرکاربرد ریاضیات تبدیل شده است. تحلیل کلان‌داده‌ها نیازمند استفاده از روش‌های آماری، جبر خطی و بهینه‌سازی است. ریاضیات به ما کمک می‌کند تا الگوهای پنهان در داده‌ها را کشف کرده و تصمیم‌گیری‌های بهتری انجام دهیم.
                `,
                author: {
                    id: 2, // شناسه نویسنده
                    name: 'محمد توکلی',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png', // لینک عکس نویسنده
                },
                image: 'https://via.placeholder.com/800x400', // لینک عکس مقاله
                date: '۱۴۰۲/۰۸/۰۲',
                likes: 85
            }
        ];

        const foundArticle = articleData.find(a => a.id === parseInt(id));
        if (foundArticle) {
            setArticle(foundArticle);
            setLikeCount(foundArticle.likes);
            setShortLink(window.location.href);

            // بررسی وضعیت لایک و ذخیره‌سازی از localStorage
            const likedStatus = localStorage.getItem(`article_${id}_liked`) === 'true';
            const savedStatus = localStorage.getItem(`article_${id}_saved`) === 'true';
            setLiked(likedStatus);
            setSaved(savedStatus);

            // اگر کاربر قبلاً لایک کرده بود، تعداد لایک‌ها رو افزایش بدید
            if (likedStatus) {
                setLikeCount(foundArticle.likes + 1);
            }
        } else {
            setError('مقاله مورد نظر یافت نشد.');
        }
    }, [id]);

    const handleLike = () => {
        const newLikedStatus = !liked;
        setLiked(newLikedStatus);
        localStorage.setItem(`article_${id}_liked`, newLikedStatus);

        // به‌روزرسانی تعداد لایک‌ها
        const newLikeCount = newLikedStatus ? likeCount + 1 : likeCount - 1;
        setLikeCount(newLikeCount);
    };

    const handleSave = () => {
        const newSavedStatus = !saved;
        setSaved(newSavedStatus);
        localStorage.setItem(`article_${id}_saved`, newSavedStatus);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortLink)
            .then(() => alert('لینک کپی شد!'))
            .catch(() => alert('خطا در کپی کردن لینک!'));
    };

    if (error) {
        return <div className="text-red-500 dark:text-red-400">{error}</div>;
    }

    if (!article) {
        return <div className="text-gray-700 dark:text-gray-300">در حال بارگذاری...</div>;
    }

    const readingTime = calculateReadingTime(article.description);

    return (
        <div className="container mx-auto p-4 dark:bg-gray-600">
            <div className="media shadow-lg p-6 rounded-lg bg-white dark:bg-gray-700">

                {/* باکس نویسنده و نوع مقاله */}
                <div className="flex justify-between items-center mb-6 p-4 border-b border-gray-300 dark:border-gray-600">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                            icon={articleTypeIcons[article.type]}
                            className="text-xl text-gray-600 dark:text-gray-400"
                        />
                        <span className="text-lg text-gray-600 dark:text-gray-400">
                            {article.type}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            to={`/author/${article.author.id}`} // لینک به صفحه نویسنده
                            className="text-lg font-bold text-gray-900 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400"
                        >
                            {article.author.name}
                        </Link>
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                            <img
                                src={article.author.image}
                                alt={article.author.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* تیتر مقاله */}
                <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    {article.title}
                </h1>

                {/* تاریخ و زمان مطالعه */}
                <div className="text-gray-400 dark:text-gray-200 mb-8 text-sm">
                    <div className='flex gap-4'>
                        <span className="mb-1">تاریخ: {article.date}</span>
                        <span>زمان مطالعه: {readingTime}</span>
                    </div>
                </div>

                {/* تصویر مقاله */}
                <div className="mb-6">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </div>

                {/* متن مقاله */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
                    {article.description}
                </p>

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
                                saved ? 'bg-green-500 text-white dark:text-black dark:bg-green-400' : 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-500'
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

export default ArticleDetailPage;