import api from '@/utils/api/apiInstance';

export const updateRecord = async (data: { id: string } | FormData) => {
  if (data instanceof FormData) {
    const id = data.get('id');
    const response = await api.put(`/records/update/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } else {
    const response = await api.put(`/records/update/${data.id}`, data);
    return response.data;
  }
};
