import { useState } from "react";

import { format } from "date-fns";
import { useDebounce, useGetGuardianNews } from "@/hooks";
import { Newspaper } from "lucide-react";
import { NoDataFound } from "./common/no-data-found";
import { NewsFilters, NewsFilterState } from "./common/news-filters";
import { NewsSkeleton } from "./common/news-skeleton";
import { GuardianArticle } from "@/types";
import { NewsCard } from "./common/news-card";

export const GuardianNewsContents = () => {
  const guardianSortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Relevance", value: "relevance" },
  ];

  const [filters, setFilters] = useState<NewsFilterState>({
    search: "It",
    sortBy: "",
    dateRange: undefined,
  });

  const debouncedSearch = useDebounce(filters.search, 1000);
  const payload = {
    q: debouncedSearch,
    "from-date": filters.dateRange?.from
      ? format(filters.dateRange.from, "yyyy-MM-dd")
      : "",
    "to-date": filters.dateRange?.to
      ? format(filters.dateRange.to, "yyyy-MM-dd")
      : "",
    "order-by": filters.sortBy,
  };

  const {
    data: articleData,
    isLoading,
    error,
  } = useGetGuardianNews({ payload });

  const newsData = articleData?.response?.results || [];

  return (
    <div className="mx-auto p-4 rounded-md mt-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Newspaper className="w-8 h-8 text-red-500" />
        The Guardian News API
      </h1>

      {/* Search & Filters */}
      <NewsFilters
        sortByOptions={guardianSortOptions}
        onFilterChange={setFilters}
      />

      {/* News Content */}
      {isLoading ? (
        <NewsSkeleton type="guardian" />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : newsData.length === 0 ? (
        <NoDataFound title="No News Found" />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsData.map((article: GuardianArticle) => (
            <NewsCard
              key={article.id}
              title={article.webTitle}
              date={article.webPublicationDate}
              url={article.webUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};
