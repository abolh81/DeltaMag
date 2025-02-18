import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ArticleEditor = ({ onSave, onCancel }) => {
    const editor = useRef(null);
    const [title, setTitle] = useState('');
    const [topic, setTopic] = useState('');
    const [content, setContent] = useState('');
    const [fileData, setFileData] = useState({ image: null, document: null, video: null });
    const [preview, setPreview] = useState(null);
    const [borderColor, setBorderColor] = useState({ image: 'gray', document: 'gray', video: 'gray' });

    const config = useMemo(() => ({
        language: 'en',
        height: 450,
        readonly: false,
        placeholder: 'لطفا متن مقاله خود را وارد کنید...'
    }), []);
    
    const validFormats = {
        image: ['image/png', 'image/jpeg', 'image/gif'],
        document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        video: ['video/mp4', 'video/webm']
    };

    const validateFile = (file, type) => {
        if (file && !validFormats[type].includes(file.type)) {
            toast.error(`فرمت فایل انتخابی برای ${type} اشتباه است!`, { position: "top-right" });
            return false;
        }
        return true;
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file && validateFile(file, type)) {
            setFileData(prev => ({ ...prev, [type]: file }));
            setPreview(type === 'image' ? URL.createObjectURL(file) : null); // برای تصویر، پیش‌نمایش را ست می‌کنیم
    
            // تغییر رنگ مرز به طور دقیق
            setBorderColor(prev => {
                const updatedBorderColor = { ...prev, [type]: 'green' };
                console.log("Updated immediately:", updatedBorderColor); // مقدار جدید نمایش داده می‌شود ✅
                return updatedBorderColor;
            });
            
        }
    };

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
                onSave({ title, topic, content, ...fileData });
                toast.success("مقاله با موفقیت ذخیره شد!", { position: "top-right" });
            }
        });
    };

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
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">عنوان مقاله</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">موضوع مقاله</label>
                <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" />
            </div>
            <div className="mb-4">
                <JoditEditor ref={editor} value={content} config={config} onBlur={(newContent) => setContent(newContent)} />
            </div>
            <div className='flex basis-1/3 gap-4 items-start'>
                {['image', 'document', 'video'].map(type => (
                    <div key={type} className="flex flex-col items-center justify-center w-full mb-4">
                        <label 
                        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800`}
                        style={{ backgroundColor: borderColor[type] === 'green' ? '#d1d5db' : '#f9fafb' }}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">برای آپلود کلیک کن</span> یا فایلتو بکش اینجا</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center"> فرمت های درست : {validFormats[type].map(item => item.replace(type+"/", '')).join(" , ")}</p>
                            </div>
                            <input 
                                type="file" 
                                className="hidden" 
                                accept={validFormats[type].join(',')} 
                                onChange={(e) => handleFileChange(e, type)} 
                            />
                        </label>
                        {fileData[type] && <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{fileData[type].name}</p>}
                        {type === 'image' && preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover mx-auto mt-2 rounded-lg shadow-lg" />}
                    </div>
                ))}
            </div>
            <div className="flex justify-end gap-4">
                <button onClick={handleCancel} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">لغو</button>
                <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">ذخیره مقاله</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ArticleEditor;
