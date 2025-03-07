import {
  GuardianNewsPayloadType,
  GuardianNewsResponse,
  NewPayloadType,
  BBCPayloadType,
  BBCNewsResponse,
  NewsResponse,
} from "@/types";
import axios from "axios";
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
export const fetchNews = async (
  payload: NewPayloadType
): Promise<NewsResponse> => {
  const url = `https://news-api14.p.rapidapi.com/v2/search/articles`;

  const response = await axios.get<NewsResponse>(url, {
    params: {
      ...payload,
      language: "en",
    },
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": "news-api14.p.rapidapi.com",
    },
  });
  return response.data;
};
export const fetchBBCNews = async (
  payload: BBCPayloadType
): Promise<BBCNewsResponse> => {
  const url = "https://real-time-news-data.p.rapidapi.com/search";

  const response = await axios.get<BBCNewsResponse>(
    url,

    {
      params: { ...payload, limit: 10 },
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
      },
    }
  );
  return response.data;
};
export const fetchGuardianNews = async (
  payload: GuardianNewsPayloadType
): Promise<GuardianNewsResponse> => {
  const url = `https://content.guardianapis.com/search`;

  const response = await axios.get<GuardianNewsResponse>(url, {
    params: {
      ...payload,
      "api-key": "test",
    },
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
