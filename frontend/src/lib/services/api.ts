import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  // Get all presentations
  getPresentations: async () => {
    const response = await axios.get(`${API_URL}/presentations`);
    return response.data;
  },

  // Submit new presentation
  submitPresentation: async (data: any) => {
    const response = await axios.post(`${API_URL}/presentations`, data);
    return response.data;
  },

  // Update presentation (teacher)
  updatePresentation: async (id: string, data: any) => {
    const response = await axios.put(`${API_URL}/presentations/${id}`, data);
    return response.data;
  },

  // Delete presentation
  deletePresentation: async (id: string) => {
    const response = await axios.delete(`${API_URL}/presentations/${id}`);
    return response.data;
  },
};
