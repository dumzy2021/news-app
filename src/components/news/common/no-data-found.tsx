import { CalendarIcon } from "lucide-react";

type NoDataFoundType = {
  title: string;
  subTitle?: string;
};
export const NoDataFound = ({
  title,
  subTitle = `Sorry, we couldn't find any news articles matching your search. Try
            adjusting your filters or using different keywords.`,
}: NoDataFoundType) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <div className="bg-gray-100 p-6 rounded-full">
        <CalendarIcon className="w-12 h-12 text-gray-400" />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-700">{title}</h2>
      <p className="mt-2 text-gray-500 max-w-md">{subTitle}</p>
    </div>
  );
};
