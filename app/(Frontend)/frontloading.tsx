import { Skeleton } from "@/components/ui/skeleton"

export default function FrontLoading() {
  return (
    <div className="w-full space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between p-4 border-b">
        <Skeleton className="h-8 w-24" /> {/* Logo */}
        <div className="flex gap-4">
          <Skeleton className="h-6 w-20" /> {/* Nav items */}
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      {/* Categories Skeleton */}
      <div className="flex justify-between px-4 overflow-x-auto">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 min-w-[100px]">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      {/* Property Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="relative">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-full absolute top-4 right-4" /> {/* Heart icon */}
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" /> {/* Title */}
              <Skeleton className="h-4 w-1/2" /> {/* Location */}
              <Skeleton className="h-4 w-2/3" /> {/* Availability */}
              <div className="flex gap-4">
                <Skeleton className="h-4 w-16" /> {/* Rating */}
                <Skeleton className="h-4 w-24" /> {/* Price */}
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-4 w-12" /> {/* Beds */}
                <Skeleton className="h-4 w-12" /> {/* Baths */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-8 bg-muted/10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-2">
              {[...Array(4)].map((_, j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

