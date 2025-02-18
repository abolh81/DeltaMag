// components/ArticleStatus.js
import React from 'react';

const ArticleStatus = ({ status }) => {
    let statusText, statusColor;

    switch (status) {
        case 'تایید شده':
            statusText = 'تایید شده';
            statusColor = 'text-green-500';
            break;
        case 'در حال ویراستاری':
            statusText = 'در حال ویراستاری';
            statusColor = 'text-yellow-500';
            break;
        case 'در انتظار تایید سردبیر':
            statusText = 'در انتظار تایید سردبیر';
            statusColor = 'text-red-500';
            break;
        default:
            statusText = 'وضعیت نامشخص';
            statusColor = 'text-gray-500';
    }

    return (
        <p className={`text-sm ${statusColor}`}>
            وضعیت: {statusText}
        </p>
    );
};

export default ArticleStatus;