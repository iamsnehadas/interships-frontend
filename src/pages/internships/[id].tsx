import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getInternshipById } from '@/services/internships';
import { Layout } from '@/components/Layout';

export default function InternshipDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [internship, setInternship] = useState<{
    title: string;
    description: string;
    company: string;
    location: string;
    deadline: string;
  } | null>(null);

  useEffect(() => {
    if (id) {
      const fetchInternship = async () => {
        const data = await getInternshipById(Number(id));
        setInternship(data);
      };

      fetchInternship();
    }
  }, [id]);

  if (!internship) return <p>Loading...</p>;

  return (
    <Layout>
      <h1>{internship.title}</h1>
      <p>{internship.description}</p>
      <p>
        <strong>Company:</strong> {internship.company}
      </p>
      <p>
        <strong>Location:</strong> {internship.location}
      </p>
      <p>
        <strong>Deadline:</strong> {new Date(internship.deadline).toDateString()}
      </p>
    </Layout>
  );
}
