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
  mutationFn: MutationFunction<TData, TVariables>,
  onSuccess?: ((data: TData, variables: TVariables, context: TContext) => unknown) | undefined,
  onError?:
    | ((error: TError, variables: TVariables, context: TContext | undefined) => unknown)
    | undefined
) => {
  const { data, error, isError, isPending, isSuccess } = useMutation<
    TData,
    TError,
    TVariables,
    TContext
  >({
    mutationFn,
    onSuccess,
    onError,
  });

  return { data, error, isError, isPending, isSuccess };
};
