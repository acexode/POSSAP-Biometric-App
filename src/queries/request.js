import axios from 'axios';
import { useQuery } from 'react-query';
import axiosInstance from '../utils/auth-fetch';
import getUrlString from '../utils/get-url-string';

async function getAllService() {
  const url = getUrlString(`/api/v1/users/all-services`);
  const response = await axiosInstance.get(url);
  return response;
}

export default function useAllService() {
  const { isFetching, data, error } = useQuery('services', getAllService);
  return { data: data?.data.data, isFetching, error };
}
