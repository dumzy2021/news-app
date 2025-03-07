import { useState } from "react";
import { format } from "date-fns";
import { useDebounce, useGetNews } from "@/hooks";
import { NewsArticle } from "@/types";
import { Newspaper } from "lucide-react";
import { NoDataFound } from "./common/no-data-found";
import { NewsFilters, NewsFilterState } from "./common/news-filters";
import { NewsSkeleton } from "./common/news-skeleton";
import { NewsCard } from "./common/news-card";

export const NewsContents = () => {
  const [filters, setFilters] = useState<NewsFilterState>({
    search: "It",
    dateRange: { from: new Date(), to: new Date() },
  });

  const debouncedSearch = useDebounce(filters.search, 1000);

  const payload = {
    query: debouncedSearch,
    from: filters.dateRange?.from
      ? format(filters.dateRange.from, "yyyy-MM-dd")
      : "",
    to: filters.dateRange?.to ? format(filters.dateRange.to, "yyyy-MM-dd") : "",
  };

  const {
    data: articleData,
    isLoading,
    error,
  } = useGetNews({
    payload,
  });

  const newsData = articleData?.data || [];

  return (
    <div className="mx-auto p-4 rounded-md mt-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Newspaper className="w-8 h-8 text-red-500" />
        News API
      </h1>
      {/* Search & Filters */}
      <NewsFilters onFilterChange={setFilters} />

      {/* News Content */}
      {isLoading ? (
        // Loading Skeleton
        <NewsSkeleton type="news" />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : newsData.length === 0 ? (
        <NoDataFound title="No News Found" />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsData.map((article: NewsArticle) => (
            <NewsCard
              key={article.url}
              title={article.title}
              date={article.date}
              url={article.url}
              excerpt={article.excerpt}
              thumbnail={article.thumbnail}
            />
          ))}
        </div>
      )}
    </div>
  );
};
