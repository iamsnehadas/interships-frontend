import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getAllInternships = async () => {
  const { data } = await axios.get(`${BASE_URL}/internships`);
  return data;
};

export const getInternshipById = async (id: number) => {
  const { data } = await axios.get(`${BASE_URL}/internships/${id}`);
  return data;
};

export const createInternship = async (internshipData: any, token: string) => {
  const { data } = await axios.post(`${BASE_URL}/internships`, internshipData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
