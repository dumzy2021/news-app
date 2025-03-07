import { fetchGuardianNews, fetchNews, fetchBBCNews, QUERY_KEYS } from "@/api";
import { proofObject } from "@/lib/utils";
import {
  GuardianNewsPayloadType,
  GuardianNewsResponse,
  NewPayloadType,
  BBCPayloadType,
  BBCNewsResponse,
  NewsResponse,
} from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetNews = ({
  payload,
  onSuccess,
}: {
  payload: NewPayloadType;
  onSuccess?: (data: NewsResponse) => void;
}): UseQueryResult<NewsResponse, AxiosError> => {
  return useQuery({
    queryKey: [QUERY_KEYS.NEWS.GET_NEWS_API, payload],
    queryFn: async () => {
      const newFilters = proofObject({ ...(payload || {}) });
      const response = await fetchNews(newFilters);

      onSuccess?.(response);

      return response;
    },
    enabled: !!payload?.query,
  });
};
export const useGetBBCNews = ({
  payload,
  onSuccess,
}: {
  payload: BBCPayloadType;
  onSuccess?: (data: BBCNewsResponse) => void;
}): UseQueryResult<BBCNewsResponse, AxiosError> => {
  return useQuery({
    queryKey: [QUERY_KEYS.NEWS.GET_NEWS_API, payload],
    queryFn: async () => {
      const newFilters = proofObject({ ...(payload || {}) });
      const response = await fetchBBCNews(newFilters);

      onSuccess?.(response);

      return response;
    },
    enabled: !!payload?.query,
  });
};
export const useGetGuardianNews = ({
  payload,
  onSuccess,
}: {
  payload: GuardianNewsPayloadType;
  onSuccess?: (data: GuardianNewsResponse) => void;
}): UseQueryResult<GuardianNewsResponse, AxiosError> => {
  return useQuery({
    queryKey: [QUERY_KEYS.NEWS.GET_GUARDIAN_NEWS_API, payload],
    queryFn: async () => {
      const newFilters = proofObject({ ...(payload || {}) });
      const response = await fetchGuardianNews(newFilters);

      onSuccess?.(response);

      return response;
    },
    enabled: !!payload?.q,
  });
};
