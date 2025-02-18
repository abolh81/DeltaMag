import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ArticleEditor = ({ onSave, onCancel }) => {
    const editor = useRef(null);
    const [title, setTitle] = useState('');
    const [topic, setTopic] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [video, setVideo] = useState(null);

    // 📌 تنظیمات Jodit Editor
    const config = useMemo(() => ({
        language: 'en',
        height: 450,
        readonly: false,
        placeholder: 'لطفا متن مقاله خود را وارد کنید...',
    }), []);

    // 📌 بررسی فرمت فایل
    const validateFile = (file, type) => {
        const validFormats = {
            image: ['image/png', 'image/jpeg', 'image/gif'],
            document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            video: ['video/mp4', 'video/webm']
        };

        if (file && !validFormats[type].includes(file.type)) {
            toast.error(`فرمت فایل انتخابی برای ${type} اشتباه است!`, { position: "top-right" });
            return false;
        }
        return true;
    };

    // 📌 هندل آپلود دراگ‌اند‌دراپ
    const handleDrop = (e, type) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (validateFile(file, type)) {
            if (type === "image") {
                setImage(file);
                setPreview(URL.createObjectURL(file));
            } else if (type === "document") {
                setFile(file);
            } else if (type === "video") {
                setVideo(file);
            }
        }
    };

    // 📌 ذخیره مقاله با تأیید
    const handleSave = () => {
        if (!title || !topic) {
            toast.error("لطفاً عنوان و موضوع مقاله را وارد کنید!", { position: "top-right" });
            return;
        }

        toast.info("آیا از ذخیره مقاله مطمئن هستید؟", {
            position: "top-right",
            autoClose: false,
            closeOnClick: true,
            draggable: true,
            onClick: () => {
                const articleData = { title, topic, content, image, file, video };
                onSave(articleData);
                toast.success("مقاله با موفقیت ذخیره شد!", { position: "top-right" });
            }
        });
    };

    // 📌 لغو ویرایش مقاله با تأیید
    const handleCancel = () => {
        toast.info("آیا از لغو ویرایش مطمئن هستید؟", {
            position: "top-right",
            autoClose: false,
            closeOnClick: true,
            draggable: true,
            onClick: () => {
                onCancel();
                toast.warn("ویرایش مقاله لغو شد!", { position: "top-right" });
            }
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">ویرایشگر مقاله</h2>

            {/* فیلد عنوان */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">عنوان مقاله</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                />
            </div>

            {/* فیلد موضوع */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">موضوع مقاله</label>
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                />
            </div>

            {/* فیلد ویرایشگر متن */}
            <div className="mb-4">
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onBlur={(newContent) => setContent(newContent)}
                />
            </div>

            {/* دراپ‌باکس آپلود عکس */}
            <div
                className="border-2 border-dashed p-4 rounded-lg cursor-pointer text-center mb-4"
                onDrop={(e) => handleDrop(e, "image")}
                onDragOver={(e) => e.preventDefault()}
            >
                <p className="text-gray-500">عکس را اینجا بکشید و رها کنید یا کلیک کنید</p>
                <input type="file" onChange={(e) => handleDrop(e, "image")} hidden />
            </div>
            {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover mx-auto mt-2 rounded-lg" />}

            {/* دراپ‌باکس آپلود فایل */}
            <div
                className="border-2 border-dashed p-4 rounded-lg cursor-pointer text-center mb-4"
                onDrop={(e) => handleDrop(e, "document")}
                onDragOver={(e) => e.preventDefault()}
            >
                <p className="text-gray-500">فایل مقاله را اینجا بکشید و رها کنید یا کلیک کنید</p>
                <input type="file" onChange={(e) => handleDrop(e, "document")} hidden />
            </div>

            {/* دراپ‌باکس آپلود ویدیو */}
            <div
                className="border-2 border-dashed p-4 rounded-lg cursor-pointer text-center mb-4"
                onDrop={(e) => handleDrop(e, "video")}
                onDragOver={(e) => e.preventDefault()}
            >
                <p className="text-gray-500">ویدیو مقاله را اینجا بکشید و رها کنید یا کلیک کنید</p>
                <input type="file" onChange={(e) => handleDrop(e, "video")} hidden />
            </div>

            {/* دکمه‌های ذخیره و لغو */}
            <div className="flex justify-end space-x-4">
                <button onClick={handleCancel} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">لغو</button>
                <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">ذخیره مقاله</button>
            </div>

            <ToastContainer />
        </div>
    );
};

export default ArticleEditor;
