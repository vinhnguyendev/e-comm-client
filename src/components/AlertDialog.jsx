import React from 'react';

const AlertDialog = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="px-4 py-5 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;