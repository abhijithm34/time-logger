import React from 'react';
import { Card, CardContent, Typography, Divider, Box, Grid, Chip } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AB47BC', '#FF5252', '#29B6F6', '#66BB6A'];

function renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#333" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={14} fontWeight={600}>
      {name} ({(percent * 100).toFixed(0)}%)
    </text>
  );
}

export default function SummaryChart({ summary }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const total = summary.reduce((sum, item) => sum + item.totalMinutes, 0);

  return (
    <Card sx={{ mt: 3, mb: 3, boxShadow: 6, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: 700, letterSpacing: 1 }}>
          {t('Summary by Activity')}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ width: '100%', height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ResponsiveContainer width="100%" height={400} minWidth={320} minHeight={320}>
            <PieChart>
              <Pie
                data={summary}
                dataKey="totalMinutes"
                nameKey="_id"
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={150}
                fill="#8884d8"
                label={renderCustomizedLabel}
                labelLine={false}
                isAnimationActive
              >
                {summary.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} name={entry._id} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} min`} />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        {summary.length > 0 && (
          <Grid container spacing={1} justifyContent="center" sx={{ mt: 2 }}>
            {summary.map((entry, idx) => (
              <Grid item key={entry._id}>
                <Chip
                  label={`${entry._id}: ${entry.totalMinutes} min`}
                  sx={{ backgroundColor: COLORS[idx % COLORS.length], color: '#fff', fontWeight: 600 }}
                />
              </Grid>
            ))}
          </Grid>
        )}
        {summary.length === 0 && (
          <Typography sx={{ mt: 2 }} align="center">{t('No summary for this date.')}</Typography>
        )}
      </CardContent>
    </Card>
  );
} 