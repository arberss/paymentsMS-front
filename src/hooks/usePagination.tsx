import axios from '@/utils/axios';
import { useQuery } from 'react-query';

interface UseQueryProps {
  path: string;
  params: { [key: string]: any };
  options?: any;
}

export const usePagination = <T extends unknown>(
  path: UseQueryProps['path'],
  params: UseQueryProps['params'],
  options?: UseQueryProps['options']
) => {
  return useQuery<T>(
    [path, params],
    async (): Promise<T> => {
      const result = await axios.get(path, { params });
      return result.data as T;
    },
    { staleTime: 1 * 60 * 1000, keepPreviousData: true, ...options }
  );
};
