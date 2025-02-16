import React, { useState } from 'react';
// import { GoogleLogin } from 'react-google-login';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// اعتبارسنجی فرم با Yup
const schema = yup.object().shape({
    firstName: yup.string().required('نام الزامی است'),
    lastName: yup.string().required('نام خانوادگی الزامی است'),
    email: yup.string().email('ایمیل معتبر نیست').required('ایمیل الزامی است'),
    password: yup.string().min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد').required('رمز عبور الزامی است'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'رمز عبور و تایید آن باید یکسان باشند')
        .required('تایید رمز عبور الزامی است'),
});

const SignupPage = () => {
    const [step, setStep] = useState(1); // مرحله فعلی فرم
    const [showPassword, setShowPassword] = useState(false); // نمایش/مخفی کردن رمز عبور
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // نمایش/مخفی کردن تایید رمز عبور

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // ارسال فرم
    const onSubmit = (data) => {
        console.log('Form Data:', data);
        setStep(2); // رفتن به مرحله بعدی
    };

    // ثبت نام با گوگل
    const responseGoogle = (response) => {
        console.log('Google Response:', response);
        // در اینجا می‌توانید اطلاعات کاربر را به سرور ارسال کنید
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    ثبت نام
                </h2>

                {/* ثبت نام با گوگل */}
                {/* <div className="mb-6">
                    <GoogleLogin
                        clientId="YOUR_GOOGLE_CLIENT_ID" // جایگزین کنید با Client ID گوگل خود
                        buttonText="ثبت نام با گوگل"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="w-full"
                    />
                </div> */}

                {/* <div className="text-center text-gray-600 dark:text-gray-400 mb-6">یا</div> */}

                {/* فرم ثبت نام */}
                {step === 1 && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* نام */}
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                نام
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                {...register('firstName')}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-100"
                                placeholder="نام"
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                            )}
                        </div>

                        {/* نام خانوادگی */}
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                نام خانوادگی
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                {...register('lastName')}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-100"
                                placeholder="نام خانوادگی"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                            )}
                        </div>

                        {/* ایمیل */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                ایمیل
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register('email')}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-100"
                                placeholder="example@example.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* رمز عبور */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                رمز عبور
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    {...register('password')}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-100"
                                    placeholder="********"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 left-0 px-3 flex items-center text-gray-500 dark:text-gray-400"
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* تایید رمز عبور */}
                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                تایید رمز عبور
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    {...register('confirmPassword')}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-100"
                                    placeholder="********"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 left-0 px-3 flex items-center text-gray-500 dark:text-gray-400"
                                >
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* دکمه ثبت نام */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            ادامه
                        </button>
                    </form>
                )}

                {/* مرحله دوم (نمونه) */}
                {step === 2 && (
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
                            مرحله دوم
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center">
                            اطلاعات شما با موفقیت ثبت شد!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignupPage;