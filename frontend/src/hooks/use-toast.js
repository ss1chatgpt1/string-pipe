import React from "react";

// Simple toast implementation
const toastState = {
  toasts: [],
  listeners: []
};

const addToast = (toast) => {
  const id = Date.now();
  const newToast = { ...toast, id };
  toastState.toasts.push(newToast);
  
  // Notify listeners
  toastState.listeners.forEach(listener => listener(toastState.toasts));
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    removeToast(id);
  }, 5000);
  
  return { id, dismiss: () => removeToast(id) };
};

const removeToast = (id) => {
  toastState.toasts = toastState.toasts.filter(toast => toast.id !== id);
  toastState.listeners.forEach(listener => listener(toastState.toasts));
};

export const toast = {
  success: (message) => addToast({ type: 'success', message }),
  error: (message) => addToast({ type: 'error', message }),
  info: (message) => addToast({ type: 'info', message }),
  warning: (message) => addToast({ type: 'warning', message })
};

export const useToast = () => {
  const [toasts, setToasts] = React.useState(toastState.toasts);
  
  React.useEffect(() => {
    const listener = (newToasts) => setToasts([...newToasts]);
    toastState.listeners.push(listener);
    
    return () => {
      const index = toastState.listeners.indexOf(listener);
      if (index > -1) {
        toastState.listeners.splice(index, 1);
      }
    };
  }, []);
  
  return { toasts, toast };
};