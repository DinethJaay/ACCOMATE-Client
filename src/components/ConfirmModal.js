import React from 'react';
import { ExclamationIcon, CheckIcon, XIcon } from '@heroicons/react/solid';

export default function ConfirmModal({
                                         isOpen,
                                         title,
                                         message,
                                         confirmText = 'Confirm',
                                         cancelText = 'Cancel',
                                         onConfirm,
                                         onCancel,
                                     }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 transform transition-all">
                <ExclamationIcon className="mx-auto h-12 w-12 text-yellow-500" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center">
                    {title}
                </h3>
                <p className="mt-2 text-gray-600 text-center">
                    {message}
                </p>
                <div className="mt-6 flex justify-center space-x-4">
                    <button
                        onClick={onCancel}
                        className="flex items-center space-x-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        <XIcon className="h-5 w-5 text-gray-700" />
                        <span className="text-gray-700">{cancelText}</span>
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex items-center space-x-2 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                    >
                        <CheckIcon className="h-5 w-5" />
                        <span>{confirmText}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
