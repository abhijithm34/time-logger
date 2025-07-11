import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  useMediaQuery,
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PieChartIcon from '@mui/icons-material/PieChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Header from './components/Header';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import SummaryChart from './components/SummaryChart';
import SummaryList from './components/SummaryList';
import FeedbackSnackbar from './components/FeedbackSnackbar';
import { useTranslation } from 'react-i18next';

const API_URL = 'http://localhost:3000/api/logs';

function LogSection(props) {
  return (
    <>
      <ActivityForm {...props} />
      <ActivityList {...props} />
    </>
  );
}

function SummarySection({ summary }) {
  return (
    <>
      <SummaryChart summary={summary} />
      <SummaryList summary={summary} />
    </>
  );
}

const drawerWidth = 220;

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [date, setDate] = useState(() => new Date());
  const [activity, setActivity] = useState('');
  const [minutes, setMinutes] = useState('');
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('');
  const [summary, setSummary] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState('log');
  const isSmall = useMediaQuery('(max-width:900px)');
  const { t } = useTranslation();

  useEffect(() => {
    fetchLogs();
    fetchSummary();
    // eslint-disable-next-line
  }, [date]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/date/${date.toISOString().slice(0, 10)}`);
      const data = await res.json();
      setLogs(data);
    } catch (e) {
      setSnackbar({ open: true, message: t('Failed to fetch logs'), severity: 'error' });
    }
    setLoading(false);
  };

  const fetchSummary = async () => {
    try {
      const res = await fetch(`${API_URL}/summary/${date.toISOString().slice(0, 10)}`);
      const data = await res.json();
      setSummary(data);
    } catch (e) {
      setSnackbar({ open: true, message: t('Failed to fetch summary'), severity: 'error' });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!activity || !minutes) return;
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activity, date: date.toISOString().slice(0, 10), minutes: Number(minutes) }),
      });
      setActivity('');
      setMinutes('');
      setSnackbar({ open: true, message: t('Entry added!'), severity: 'success' });
      fetchLogs();
      fetchSummary();
    } catch (e) {
      setSnackbar({ open: true, message: t('Failed to add entry'), severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setSnackbar({ open: true, message: t('Entry deleted!'), severity: 'success' });
      fetchLogs();
      fetchSummary();
    } catch (e) {
      setSnackbar({ open: true, message: t('Failed to delete entry'), severity: 'error' });
    }
  };

  const filteredLogs = logs.filter(log => log.activity.toLowerCase().includes(filter.toLowerCase()));
  const totalMinutes = filteredLogs.reduce((sum, log) => sum + log.minutes, 0);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#ff9800',
      },
      background: {
        default: darkMode ? '#121212' : '#f4f6fa',
        paper: darkMode ? '#1e1e1e' : '#fff',
      },
    },
    shape: {
      borderRadius: 12,
    },
  });

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem button selected={section === 'log'} onClick={() => setSection('log')}>
          <ListItemIcon><ListAltIcon /></ListItemIcon>
          <ListItemText primary={t('Log')} />
        </ListItem>
        <ListItem button selected={section === 'summary'} onClick={() => setSection('summary')}>
          <ListItemIcon><PieChartIcon /></ListItemIcon>
          <ListItemText primary={t('Summary')} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Box sx={{ display: 'flex' }}>
          <Drawer
            variant={isSmall ? 'temporary' : 'permanent'}
            open={!isSmall || undefined}
            onClose={() => {}}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                background: darkMode
                  ? 'linear-gradient(180deg, #232526 0%, #414345 100%)'
                  : 'linear-gradient(180deg, #f4f6fa 0%, #e3e3e3 100%)',
              },
            }}
          >
            {drawer}
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, minHeight: '100vh', background: 'none' }}
          >
            {section === 'log' && (
              <LogSection
                date={date}
                setDate={setDate}
                activity={activity}
                setActivity={setActivity}
                minutes={minutes}
                setMinutes={setMinutes}
                handleAdd={handleAdd}
                filteredLogs={filteredLogs}
                loading={loading}
                filter={filter}
                setFilter={setFilter}
                handleDelete={handleDelete}
                totalMinutes={totalMinutes}
              />
            )}
            {section === 'summary' && <SummarySection summary={summary} />}
            <FeedbackSnackbar
              open={snackbar.open}
              message={snackbar.message}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
            />
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
