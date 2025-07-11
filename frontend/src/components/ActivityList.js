import React from 'react';
import { Card, CardContent, Typography, Divider, List, ListItem, ListItemText, IconButton, Paper, TextField, InputAdornment } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

export default function ActivityList({ filteredLogs, loading, filter, setFilter, handleDelete, totalMinutes, date }) {
  return (
    <>
      <Paper sx={{ mt: 3, p: 2 }}>
        <TextField
          label="Filter by activity"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6">
            Entries for {date.toISOString().slice(0, 10)} (Total: {totalMinutes} min)
          </Typography>
          <Divider sx={{ my: 1 }} />
          <List>
            {loading ? (
              <ListItem>
                <ListItemText primary="Loading..." />
              </ListItem>
            ) : filteredLogs.length === 0 ? (
              <ListItem>
                <ListItemText primary="No entries found." />
              </ListItem>
            ) : filteredLogs.map(log => (
              <ListItem
                key={log._id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(log._id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={`${log.activity} - ${log.minutes} min`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
} 