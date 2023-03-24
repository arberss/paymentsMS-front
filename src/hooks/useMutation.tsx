import axios from '@/utils/axios';
import { useMutation } from 'react-query';

interface UseMutationProps {
  path: string;
  options?: any;
}

export const usePostMutation = <T extends unknown>(
  path: UseMutationProps['path'],
  options?: UseMutationProps['options']
) => {
  return useMutation<T, Error, any, unknown>(
    path,
    async (payload: any): Promise<T> => {
      const result = await axios.post(path, payload);
      return result.data as T;
    },
    options
  );
};

export const usePutMutation = <T extends unknown>(
  path: UseMutationProps['path'],
  options?: UseMutationProps['options']
) => {
  return useMutation<T, Error, any, unknown>(
    path,
    async (payload: any): Promise<T> => {
      const result = await axios.put(path, payload);
      return result.data as T;
    },
    options
  );
};
