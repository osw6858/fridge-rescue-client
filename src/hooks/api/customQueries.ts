import { useQuery, useMutation, useSuspenseQuery } from '@tanstack/react-query';
import type { MutationFunction, QueryFunction, QueryKey } from '@tanstack/react-query';

export const useCustomQuery = <TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>
) => {
  const { data, isError, isLoading, isSuccess } = useQuery({ queryKey, queryFn });

  return { data, isError, isLoading, isSuccess };
};

export const useCustomSuspenseQuery = <TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>
) => {
  const { data, isError, isLoading, isSuccess } = useSuspenseQuery({ queryKey, queryFn });

  return { data, isError, isLoading, isSuccess };
};

export const useCustomMutation = <TData, TError, TVariables, TContext>(
  mutationFn: MutationFunction<TData, TVariables>
) => {
  const mutation = useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    // TODO: 성공, 에러시 함수 작성
    // onSuccess: (data, variables, context) => {},
    // onError: (error, variables, context) => {},
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    error: mutation.error,
    isError: mutation.isError,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};
