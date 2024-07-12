import React from 'react';

interface PopupProps {
  show: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ show, onClose, content }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/3 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">✖</button>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Popup;
