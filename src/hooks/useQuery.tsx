import axios from '@/utils/axios';
import { useQuery as useReactQuery } from 'react-query';

interface UseQueryProps {
  path: string;
  params?: { [key: string]: any };
  options?: any;
}

export const useQuery = <T extends unknown>(
  path: UseQueryProps['path'],
  params?: UseQueryProps['params'],
  options?: UseQueryProps['options']
) => {
  return useReactQuery<T>(
    path,
    async (): Promise<T> => {
      const result = await axios.get(path, { params });
      return result.data as T;
    },
    { staleTime: 1 * 60 * 1000, ...options }
  );
};
