import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from "../components/ArticleCard";


const authorsData = [
    {
        id: 1,
        name: 'علی حسینی',
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        position: 'مدیر مسئول نشریه',
        bio: 'علی حسینی، مدیر مسئول نشریه دلتا، دارای مدرک دکترای ریاضیات از دانشگاه تهران است. او بیش از ۱۰ سال سابقه تدریس و تحقیق در حوزه‌های مختلف ریاضیات دارد.'
    },
    {
        id: 2,
        name: 'محمد توکلی',
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        position: 'سردبیر',
        bio: 'محمد توکلی، سردبیر نشریه دلتا، دارای مدرک کارشناسی ارشد ریاضیات کاربردی از دانشگاه صنعتی شریف است. او در زمینه‌های ریاضیات مالی و علوم داده تخصص دارد.'
    }
];

const articlesData = [
    {
        id: 1,
        type: 'تاریخ ریاضیات',
        title: 'نمونه مقاله',
        description: 'توضیحات مقاله...',
        author: { id: 1, name: 'علی حسینی' },
        image: 'https://via.placeholder.com/200x150',
        date: '۱۴۰۲/۰۸/۰۱',
        likes: 120
    },
    {
        id: 2,
        type: 'ریاضیات کودک',
        title: 'نمونه مقاله دوم',
        description: 'توضیحات مقاله...',
        author: { id: 2, name: 'محمد توکلی' },
        image: 'https://via.placeholder.com/200x150',
        date: '۱۴۰۲/۰۸/۰۲',
        likes: 85
    }
];

function Author() {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const foundAuthor = authorsData.find(a => a.id === parseInt(id));
        if (foundAuthor) {
            setAuthor(foundAuthor);
            setArticles(articlesData.filter(a => a.author.id === foundAuthor.id));
        } else {
            setError('نویسنده مورد نظر یافت نشد.');
        }
    }, [id]);

    if (error) {
        return <div className="text-red-500 dark:text-red-400">{error}</div>;
    }

    if (!author) {
        return <div className="text-gray-700 dark:text-gray-300">در حال بارگذاری...</div>;
    }

    return (
        <div className="container mx-auto p-4 dark:bg-gray-600">
            {/* باکس اطلاعات نویسنده */}
            <div className="bg-slate-200 dark:bg-gray-700 p-6 rounded-lg mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                        <img
                            src={author.image}
                            alt={author.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {author.name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {author.position}
                        </p>
                    </div>
                </div>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                    {author.bio}
                </p>
            </div>

            {/* مقالات مرتبط */}
            <div className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-lg">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}

export default Author;