import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const AuthLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Skeleton className="h-12 w-48" />
        </div>
        
        {/* Form */}
        <div className="card-border p-6">
          <div className="flex flex-col gap-6">
            {/* Title */}
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
            
            {/* Form fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              
              {/* Remember me */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-24" />
              </div>
              
              {/* Submit button */}
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            
            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <Skeleton className="h-px w-full" />
              <Skeleton className="absolute h-4 w-8 bg-white" />
            </div>
            
            {/* Social login buttons */}
            <div className="flex flex-col gap-3">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            
            {/* Switch auth mode */}
            <div className="flex justify-center gap-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLoading;