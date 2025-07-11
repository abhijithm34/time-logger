import React from 'react';
import { List, ListItem, ListItemText, Card, CardContent, Typography, Divider } from '@mui/material';

export default function SummaryList({ summary }) {
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Summary List</Typography>
        <Divider sx={{ my: 1 }} />
        <List>
          {summary.length === 0 && (
            <ListItem>
              <ListItemText primary="No summary for this date." />
            </ListItem>
          )}
          {summary.map(item => (
            <ListItem key={item._id}>
              <ListItemText primary={`${item._id}: ${item.totalMinutes} min`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
} 