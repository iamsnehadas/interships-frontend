import { useEffect, useState } from 'react';
import { getAllInternships } from '@/services/internships';
import { Layout } from '@/components/Layout';
import { Card, CardContent, Typography, Grid } from '@mui/material';

export default function Internships() {
  interface Internship {
    id: number;
    title: string;
    description: string;
    company: string;
  }

  const [internships, setInternships] = useState<Internship[]>([]);

  useEffect(() => {
    const fetchInternships = async () => {
      const data = await getAllInternships();
      setInternships(data);
    };

    fetchInternships();
  }, []);

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Internship Listings
      </Typography>
      <Grid container spacing={3}>
        {internships.map((internship) => (
          <Grid item xs={12} sm={6} md={4} key={internship.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{internship.title}</Typography>
                <Typography>{internship.description}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Company: {internship.company}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
