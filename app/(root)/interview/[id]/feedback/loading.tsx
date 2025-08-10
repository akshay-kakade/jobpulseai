import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const FeedbackLoading = () => {
  return (
    <section className="feedback-section">
      {/* Header */}
      <div className="flex flex-row gap-4 justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <Skeleton className="rounded-full size-[40px]" />
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="w-24 h-10 rounded-lg" />
      </div>

      {/* Score */}
      <div className="flex flex-col items-center justify-center mt-6">
        <Skeleton className="w-32 h-32 rounded-full mb-4" />
        <Skeleton className="w-48 h-6 mb-2" />
        <Skeleton className="w-64 h-4" />
      </div>

      <hr className="my-6" />

      {/* Final Assessment */}
      <Skeleton className="w-full h-16 mb-6" />

      {/* Interview Breakdown */}
      <div className="flex flex-col gap-4 mb-6">
        <Skeleton className="w-64 h-8 mb-2" />
        
        {Array(5).fill(0).map((_, index) => (
          <div key={`category-${index}`} className="mb-4">
            <Skeleton className="w-48 h-6 mb-2" />
            <Skeleton className="w-full h-4 mb-1" />
            <Skeleton className="w-3/4 h-4" />
          </div>
        ))}
      </div>

      {/* Strengths */}
      <div className="flex flex-col gap-3 mb-6">
        <Skeleton className="w-32 h-6 mb-2" />
        <ul>
          {Array(3).fill(0).map((_, index) => (
            <li key={`strength-${index}`} className="mb-2">
              <Skeleton className="w-full h-4" />
            </li>
          ))}
        </ul>
      </div>

      {/* Areas for Improvement */}
      <div className="flex flex-col gap-3 mb-6">
        <Skeleton className="w-48 h-6 mb-2" />
        <ul>
          {Array(3).fill(0).map((_, index) => (
            <li key={`improvement-${index}`} className="mb-2">
              <Skeleton className="w-full h-4" />
            </li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
      <div className="buttons">
        <Skeleton className="w-full h-10 rounded-full mb-2" />
        <Skeleton className="w-full h-10 rounded-full" />
      </div>
    </section>
  );
};

export default FeedbackLoading;