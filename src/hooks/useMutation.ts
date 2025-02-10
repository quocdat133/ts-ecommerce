import { useMutation } from "@tanstack/react-query";

export const useMutationHook = <TData, TVariables>(
  fnCallback: (variables: TVariables) => Promise<TData>
) => {
  const mutation = useMutation<TData, unknown, TVariables>({
    mutationFn: fnCallback,
  });
  return mutation;
};
