import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ReviewStars } from './ReviewStars'

interface ReviewListProps {
  productId: string | number
}

export const ReviewList: React.FC<ReviewListProps> = async ({ productId }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'reviews',
    where: {
      and: [
        { product: { equals: productId } },
        { status: { equals: 'approved' } },
      ],
    },
    sort: '-createdAt',
    limit: 50,
    depth: 0,
  })

  const reviews = result.docs
  const count = reviews.length

  if (count === 0) return null

  const average = reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / count

  // Rating breakdown
  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percent: Math.round((reviews.filter((r) => r.rating === star).length / count) * 100),
  }))

  return (
    <div>
      {/* Summary */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8 p-5 bg-card border border-border rounded-xl">
        <div className="flex flex-col items-center justify-center sm:border-r border-border sm:pr-6 sm:min-w-[120px]">
          <span className="text-5xl font-bold">{average.toFixed(1)}</span>
          <ReviewStars rating={average} size="large" className="mt-1" />
          <span className="text-sm text-muted-foreground mt-1">
            {count} review{count !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          {breakdown.map(({ star, count: starCount, percent }) => (
            <div key={star} className="flex items-center gap-3 text-sm">
              <span className="w-12 text-right text-muted-foreground">{star} star</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="w-8 text-muted-foreground text-xs">{percent}%</span>
              <span className="w-6 text-muted-foreground text-xs">({starCount})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-6 last:border-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <ReviewStars rating={review.rating ?? 0} size="small" />
                  {review.verifiedPurchase && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Verified Purchase
                    </span>
                  )}
                </div>
                {review.title && (
                  <h4 className="font-semibold mt-1">{review.title}</h4>
                )}
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {new Date(review.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">by {review.customerName}</p>
            <p className="text-sm leading-relaxed">{review.body}</p>

            {review.adminReply && (
              <div className="mt-3 pl-4 border-l-2 border-primary/30 bg-accent/50 rounded-r-lg p-3">
                <p className="text-xs font-semibold text-primary mb-1">Response from the shop</p>
                <p className="text-sm text-muted-foreground">{review.adminReply}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper for computing average rating (used by ProductCard and product detail page header)
export async function getProductRating(productId: string | number) {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'reviews',
      where: {
        and: [
          { product: { equals: productId } },
          { status: { equals: 'approved' } },
        ],
      },
      limit: 0,
      pagination: true,
      select: { rating: true },
    })

    const reviews = result.docs
    if (reviews.length === 0) return { average: 0, count: 0 }

    const average = reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / reviews.length
    return { average: Math.round(average * 10) / 10, count: reviews.length }
  } catch {
    return { average: 0, count: 0 }
  }
}
