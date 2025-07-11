import React from 'react';
import { Card, CardContent, Typography, Box, TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function ActivityForm({ date, setDate, activity, setActivity, minutes, setMinutes, handleAdd }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add Activity
        </Typography>
        <Box component="form" onSubmit={handleAdd} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <DatePicker
            label="Date"
            value={date}
            onChange={setDate}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <TextField
            label="Activity"
            value={activity}
            onChange={e => setActivity(e.target.value)}
            fullWidth
          />
          <TextField
            label="Minutes"
            type="number"
            value={minutes}
            onChange={e => setMinutes(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" sx={{ minWidth: 120 }}>
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
} 