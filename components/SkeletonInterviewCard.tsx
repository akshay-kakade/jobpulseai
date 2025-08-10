import React from 'react';
import { Skeleton } from './ui/skeleton';

const SkeletonInterviewCard = () => {
  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-full">
      <div className="card-interview">
        <div>
          {/* Type badge skeleton */}
          <div className="absolute top-0 right-0 w-20 h-8 rounded-bl-lg">
            <Skeleton className="h-full w-full" />
          </div>
          
          {/* Role title skeleton */}
          <div className="mt-5">
            <Skeleton className="h-7 w-48" />
          </div>

          {/* Date and score skeleton */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2 items-center">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-20 h-5" />
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-16 h-5" />
            </div>
          </div>

          {/* Description skeleton */}
          <div className="mt-5">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        <div className="flex flex-row justify-between mt-4">
          {/* Tech icons skeleton */}
          <div className="flex flex-row">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full -ml-3" />
            <Skeleton className="w-8 h-8 rounded-full -ml-3" />
          </div>

          {/* Button skeleton */}
          <Skeleton className="w-32 h-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonInterviewCard;