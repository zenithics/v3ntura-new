import React from 'react'
import { cn } from '@/utilities/ui'

interface ReviewStarsProps {
  rating: number
  size?: 'small' | 'large'
  className?: string
}

export const ReviewStars: React.FC<ReviewStarsProps> = ({ rating, size = 'small', className }) => {
  const starSize = size === 'large' ? 'w-6 h-6' : 'w-4 h-4'

  return (
    <div className={cn('flex items-center gap-0.5', className)} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star
        const partial = !filled && rating > star - 1

        return (
          <svg
            key={star}
            viewBox="0 0 20 20"
            className={cn(starSize, 'flex-shrink-0')}
            aria-hidden="true"
          >
            {partial ? (
              <defs>
                <linearGradient id={`partial-${star}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset={`${(rating - Math.floor(rating)) * 100}%`} stopColor="var(--color-primary, #E8177A)" />
                  <stop offset={`${(rating - Math.floor(rating)) * 100}%`} stopColor="#D1D5DB" />
                </linearGradient>
              </defs>
            ) : null}
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              fill={
                filled
                  ? 'var(--color-primary, #E8177A)'
                  : partial
                    ? `url(#partial-${star})`
                    : '#D1D5DB'
              }
            />
          </svg>
        )
      })}
    </div>
  )
}
