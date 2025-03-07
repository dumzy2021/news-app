import { useState } from "react";
import { useDebounce, useGetBBCNews } from "@/hooks";
import { BBCPayloadType, BBCNewsResponse } from "@/types";
import { Newspaper } from "lucide-react";
import { NoDataFound } from "./common/no-data-found";
import { NewsFilters, NewsFilterState } from "./common/news-filters";
import { NewsSkeleton } from "./common/news-skeleton";
import { NewsCard } from "./common/news-card";

export const BBCNewsContents = () => {
  const SourceOptions = [
    { label: "BBC", value: "bbc.com" },
    { label: "CNN", value: "cnn.com" },
  ];

  const [filters, setFilters] = useState<NewsFilterState>({
    search: "It",
    sortBy: SourceOptions[0].value,
  });

  const debouncedSearch = useDebounce(filters.search, 1000);

  const payload: BBCPayloadType = {
    query: debouncedSearch,
    country: "US",
    source: filters?.sortBy,
    lang: "en",
  };

  const { data: articleData, isLoading, error } = useGetBBCNews({ payload });

  const newsData: BBCNewsResponse["data"] = articleData?.data || [];

  return (
    <div className="mx-auto p-4 rounded-md mt-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Newspaper className="w-8 h-8 text-red-500" />
        BBCNews API
      </h1>

      {/* Search & Filters */}
      <NewsFilters
        onFilterChange={setFilters}
        sortByOptions={SourceOptions}
        sortByPlaceholder="Select Source"
        hideDate
      />

      {/* News Content */}
      {isLoading ? (
        <NewsSkeleton type="news" />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : newsData.length === 0 ? (
        <NoDataFound title="No News Found" />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsData.map((article) => (
            <NewsCard
              key={article.link}
              title={article.title}
              date={article.published_datetime_utc}
              url={article.link}
              excerpt={article.snippet}
              thumbnail={article.photo_url || article.thumbnail_url}
            />
          ))}
        </div>
      )}
    </div>
  );
};
