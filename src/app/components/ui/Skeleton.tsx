import React from 'react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`bg-gradient-to-r from-[#E2E8F0] via-[#F1F5F9] to-[#E2E8F0] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-xl ${className}`}
    />
  );
}

export function FactoryCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="w-full aspect-square rounded-none" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />
        
        {/* Location */}
        <Skeleton className="h-4 w-1/2" />
        
        {/* Tags */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        
        {/* Score */}
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="flex items-center gap-3 p-4">
      <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function DealSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-3">
        <Skeleton className="h-10 w-24 rounded-xl" />
        <Skeleton className="h-10 w-24 rounded-xl" />
      </div>
    </div>
  );
}
