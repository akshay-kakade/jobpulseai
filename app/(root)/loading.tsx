import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import SkeletonInterviewCard from '@/components/SkeletonInterviewCard';
import Image from 'next/image';

const Loading = () => {
  return (
    <>
      {/* Hero section skeleton */}
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <Skeleton className="h-10 w-full max-w-md" />
          <Skeleton className="h-6 w-full max-w-sm" />
          <Skeleton className="h-10 w-40 rounded-full" />
        </div>
        <div className="max-sm:hidden overflow-hidden w-[200px] h-[100px]">
          <Skeleton className="w-full h-full" />
        </div>
      </section>

      {/* Your Interviews section skeleton */}
      <section>
        <div className="flex flex-col gap-6 mt-8">
          <Skeleton className="h-8 w-48" />
        </div>

        <div className="interviews-section">
          {Array(3).fill(0).map((_, index) => (
            <SkeletonInterviewCard key={`your-interview-${index}`} />
          ))}
        </div>
      </section>

      {/* Take an Interview section skeleton */}
      <section className="mt-8 flex flex-col gap-6">
        <Skeleton className="h-8 w-48" />
        
        <div className="interviews-section">
          {Array(3).fill(0).map((_, index) => (
            <SkeletonInterviewCard key={`take-interview-${index}`} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Loading;