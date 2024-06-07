import React, { useState } from 'react';

const Modal = ({
  isOpen,
  onClose,
  title = 'Simple Modal',
  content = 'This is a simple modal example using React and TailwindCSS.',
  children,
  onOk,
}) => {
  if (!isOpen) return null;
  const [disabled, setDisabled] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = async () => {
    setDisabled(true);
    await onOk();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-4 rounded shadow-lg w-3/6">
        <h2 className="text-2xl mb-4 font-bold">{title}</h2>
        <div>{children || content}</div>
        <div className="float-right">
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mr-4"
            disabled={disabled}
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
