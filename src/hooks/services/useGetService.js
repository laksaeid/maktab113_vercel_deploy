/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/axionInsrance";

export const useGetService = (endpoint, key, options) => {
  return useQuery({
    queryFn: async () => {
      return (await axiosInstance.get(endpoint)).data;
    },
    queryKey: Array.isArray(key) ? [endpoint, ...key] : [endpoint],
    ...options,
  });
};
