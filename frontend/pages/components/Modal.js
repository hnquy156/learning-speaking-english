import React from 'react';

const Modal = ({
  isOpen,
  onClose,
  title = 'Simple Modal',
  content = 'This is a simple modal example using React and TailwindCSS.',
  children,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-4 rounded shadow-lg w-3/6">
        <h2 className="text-2xl mb-4 font-bold">{title}</h2>
        <div>{children || content}</div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 float-right"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
