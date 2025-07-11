import React from 'react';
import { Snackbar } from '@mui/material';

export default function FeedbackSnackbar({ open, message, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      message={message}
    />
  );
} 