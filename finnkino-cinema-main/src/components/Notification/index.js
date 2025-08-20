import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({
    vertical: 'top',
    horizontal: 'right',
    message: '',
    severity: 'info',
  });

  const showNotification = useCallback((message, severity = 'info', vertical = 'top', horizontal = 'right') => {
    setNotification({ message, severity, vertical, horizontal });
    setOpen(true);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar open={open} anchorOrigin={{ vertical: notification.vertical, horizontal: notification.horizontal }} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
