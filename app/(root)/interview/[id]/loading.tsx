import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const InterviewLoading = () => {
  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Skeleton className="rounded-full size-[40px]" />
            <Skeleton className="h-6 w-48" />
          </div>

          <div className="flex flex-row">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full -ml-3" />
            <Skeleton className="w-8 h-8 rounded-full -ml-3" />
          </div>
        </div>

        <Skeleton className="w-24 h-10 rounded-lg" />
      </div>

      {/* Agent loading state */}
      <div className="mt-8 flex flex-col items-center justify-center p-8 rounded-lg bg-dark-200/30">
        <Skeleton className="w-16 h-16 rounded-full mb-4" />
        <Skeleton className="w-48 h-6 mb-2" />
        <Skeleton className="w-64 h-4" />
        <div className="mt-8 w-full max-w-md">
          <Skeleton className="w-full h-12 rounded-full mb-4" />
          <Skeleton className="w-full h-12 rounded-full" />
        </div>
      </div>
    </>
  );
};

export default InterviewLoading;