export type NewsResponse = {
  success: boolean;
  data: NewsArticle[];
  size: number;
  totalHits: number;
  hitsPerPage: number;
  page: number;
  totalPages: number;
  timeMs: number;
};

export type NewsArticle = {
  title: string;
  url: string;
  excerpt: string;
  thumbnail: string;
  language: string;
  paywall: boolean;
  contentLength: number;
  date: string;
  authors: string[];
  keywords: string[];
  publisher: NewsPublisher;
};

export type NewsPublisher = {
  name: string;
  url: string;
  favicon: string;
};

export type NewsPayload = {
  query: string;
  from: string;
  to: string;
  sortBy: string;
};
export type NewPayloadType = Partial<NewsPayload>;

export type GuardianNewsResponse = {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: GuardianArticle[];
  };
};

export type GuardianArticle = {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
};

export type GuardianNewsPayload = {
  q: string;
  "from-date": string;
  "to-date": string;
  "order-by": string;
};
export type GuardianNewsPayloadType = Partial<GuardianNewsPayload>;

export type BBCPayload = {
  query: string;
  lang: string;
  source: string;
  country: string;
  limit: number;
};
export type BBCPayloadType = Partial<BBCPayload>;

export type BBCNewsResponse = {
  status: string;
  request_id: string;
  data: {
    title: string;
    link: string;
    snippet: string;
    photo_url: string;
    thumbnail_url: string;
    published_datetime_utc: string;
    authors?: string[];
    source_name: string;
    source_logo_url: string;
    source_favicon_url: string;
    source_publication_id: string;
    related_topics?: {
      topic_id: string;
      topic_name: string;
    }[];
  }[];
};
