import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function SkeletonResponse() {
  return (
    <div className="flex flex-col space-y-4 pr-12 pt-4">
        <Skeleton className="h-28 w-full  bg-gray-200" />
        <Skeleton className="h-4 w-full  bg-gray-200" />
        <Skeleton className="h-4 w-[300px] bg-gray-200" />
        <Skeleton className="h-4 w-[200px] bg-gray-200" />
        <Skeleton className="h-4 w-[100px] bg-gray-200" />
    </div>
  )
}


export function SkeletonResponseLD() {
  return (
    <div className="flex flex-col space-y-4">
        <Skeleton className="h-28 w-full  bg-gray-400" />
        <Skeleton className="h-4 w-full  bg-gray-400" />
        <Skeleton className="h-4 w-[300px] bg-gray-400" />
        <Skeleton className="h-4 w-[200px] bg-gray-400" />
        <Skeleton className="h-4 w-[100px] bg-gray-400" />
    </div>
  )
}