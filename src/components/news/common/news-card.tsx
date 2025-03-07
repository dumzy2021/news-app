import { format } from "date-fns";
import React from "react";
type NewsCardProps = {
  title: string;
  date: string;
  url: string;
  excerpt?: string;
  thumbnail?: string;
};

export const NewsCard: React.FC<NewsCardProps> = ({
  title,
  date,
  url,
  excerpt,
  thumbnail,
}) => {
  return (
    <div className="p-4 border rounded-md shadow-md">
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-2"
        />
      )}
      <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
      <p className="text-sm text-gray-500">{format(new Date(date), "PPP")}</p>
      {excerpt && <p className="text-sm line-clamp-3">{excerpt}</p>}
      <a href={url} target="_blank" className="text-blue-500 mt-auto">
        Read more →
      </a>
    </div>
  );
};
