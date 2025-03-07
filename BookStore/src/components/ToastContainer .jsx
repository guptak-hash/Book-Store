import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Toast from './Toast';

let toastCount = 0;

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = `toast-${toastCount++}`;
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Custom toast notification system
  useEffect(() => {
    const originalToast = window.toast;
    
    window.toast = {
      success: (message) => addToast(message, 'success'),
      error: (message) => addToast(message, 'error'),
      info: (message) => addToast(message, 'info')
    };

    return () => {
      window.toast = originalToast;
    };
  }, []);

  if (toasts.length === 0) return null;

  return ReactDOM.createPortal(
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast 
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;