import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const ArticleCard = ({ article }) => {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);

    // بررسی اینکه آیا مقاله قبلاً ذخیره شده است یا نه
    useEffect(() => {
        const savedStatus = localStorage.getItem(`article_${article.id}_saved`) === "true";
        setIsSaved(savedStatus);
    }, [article.id]);

    // تابع ذخیره و حذف مقاله از `localStorage`
    const handleSaveArticle = () => {
        const newSavedStatus = !isSaved;
        setIsSaved(newSavedStatus);
        localStorage.setItem(`article_${article.id}_saved`, newSavedStatus);
    };

    return (
        <div className="py-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-600">
            <div className="flex">
                <img src={article.image} alt={article.title} className="w-60 h-48 rounded-lg shadow-lg ml-4" />
                <div className="flex flex-col gap-8">
                    <h3 
                        className="text-2xl font-semibold text-gray-900 dark:text-gray-100 cursor-pointer hover:text-blue-500"
                        onClick={() => navigate(`/article/${article.id}`)}
                    >
                        {article.title}
                    </h3>
                    <div className="text-sm text-gray-400 dark:text-gray-300">{article.type} | {article.date}</div>
                </div>
            </div>
            <button
                onClick={handleSaveArticle}
                className={`flex self-end items-center gap-2 px-4 py-2 rounded-lg transition-colors 
                    ${isSaved ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-gray-500 hover:bg-gray-200 dark:hover:bg-gray-400"}`}
            >
                <FontAwesomeIcon icon={faSave} className={isSaved ? "text-white" : "text-gray-600 dark:text-gray-800"} />
                <span>{isSaved ? "ذخیره شد" : "ذخیره"}</span>
            </button>
        </div>
    );
};

export default ArticleCard;
