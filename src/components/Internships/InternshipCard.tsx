import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface InternshipProps {
  company: string;
  role: string;
  location: string;
  stipend: string;
}

const InternshipCard: React.FC<InternshipProps> = ({ company, role, location, stipend }) => {
  return (
    <Card style={{ minWidth: '250px', margin: '0 8px', padding: '10px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {company}
        </Typography>
        <Typography variant="body1">{role}</Typography>
        <Typography variant="body2" color="textSecondary">
          Location: {location}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Stipend: {stipend}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InternshipCard;
