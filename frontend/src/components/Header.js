import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTranslation } from 'react-i18next';

export default function Header({ darkMode, setDarkMode }) {
  const { t } = useTranslation();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <span role="img" aria-label="logo">⏱️</span> {t('Time Logger')}
        </Typography>
        <IconButton sx={{ ml: 1 }} onClick={() => setDarkMode(!darkMode)} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="default" />
      </Toolbar>
    </AppBar>
  );
} 