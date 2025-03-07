import { Skeleton } from "../../ui/skeleton";
type NewsSkeletonType = {
  type: "news" | "guardian";
  loadingCard?: number;
};
export const NewsSkeleton = ({ loadingCard = 6, type }: NewsSkeletonType) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 space-y-4">
      {[...Array(loadingCard)].map((_, i) => (
        <div key={i} className="p-4 border rounded-md space-y-2">
          {type === "news" && (
            <Skeleton className="h-40 w-full rounded-md bg-gray-300" />
          )}
          <Skeleton className="h-6 w-3/4 rounded-md bg-gray-300" />
          <Skeleton className="h-4 w-1/2 rounded-md bg-gray-300" />
          <Skeleton className="h-12 w-full rounded-md bg-gray-300" />
        </div>
      ))}
    </div>
  );
};
