'use client'

import React, { useState, useCallback } from 'react'
import { Media } from '@/components/Media'

interface OptionValue {
  value: string
  swatchColor?: string | null
  swatchImage?: any
}

interface VariantOption {
  name: string
  displayType: 'buttons' | 'swatches' | 'dropdown'
  values: OptionValue[]
}

interface Variant {
  id?: string
  variantLabel: string
  selectedOptions: { optionName: string; optionValue: string }[]
  sku?: string | null
  price?: number | null
  stock?: number | null
  image?: any
  enabled?: boolean | null
}

interface VariantSelectorProps {
  options: VariantOption[]
  variants: Variant[]
  basePrice: number
  onVariantChange: (variant: Variant | null, selections: Record<string, string>) => void
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  options,
  variants,
  basePrice,
  onVariantChange,
}) => {
  const [selections, setSelections] = useState<Record<string, string>>({})

  const findVariant = useCallback(
    (currentSelections: Record<string, string>): Variant | null => {
      if (Object.keys(currentSelections).length !== options.length) return null

      return (
        variants.find((variant) => {
          if (!variant.enabled) return false
          return variant.selectedOptions?.every(
            (so) => currentSelections[so.optionName] === so.optionValue,
          )
        }) || null
      )
    },
    [variants, options.length],
  )

  const isValueAvailable = useCallback(
    (optionName: string, value: string): boolean => {
      const testSelections = { ...selections, [optionName]: value }
      return variants.some((variant) => {
        if (!variant.enabled) return false
        const matchesSelection = variant.selectedOptions?.every((so) => {
          if (testSelections[so.optionName] === undefined) return true
          return testSelections[so.optionName] === so.optionValue
        })
        return (
          matchesSelection &&
          (variant.stock === null || variant.stock === undefined || variant.stock > 0)
        )
      })
    },
    [variants, selections],
  )

  const handleSelect = useCallback(
    (optionName: string, value: string) => {
      const newSelections = { ...selections, [optionName]: value }
      setSelections(newSelections)
      const matched = findVariant(newSelections)
      onVariantChange(matched, newSelections)
    },
    [selections, findVariant, onVariantChange],
  )

  return (
    <div className="space-y-5">
      {options.map((option) => (
        <div key={option.name}>
          <label className="block text-sm font-medium mb-2">
            {option.name}
            {selections[option.name] && (
              <span className="text-muted-foreground font-normal ml-2">
                — {selections[option.name]}
              </span>
            )}
          </label>

          {option.displayType === 'swatches' ? (
            <div className="flex flex-wrap gap-2">
              {option.values.map((val) => {
                const isSelected = selections[option.name] === val.value
                const available = isValueAvailable(option.name, val.value)

                return (
                  <button
                    key={val.value}
                    onClick={() => handleSelect(option.name, val.value)}
                    disabled={!available}
                    title={val.value}
                    className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                      isSelected
                        ? 'border-primary ring-2 ring-primary ring-offset-2'
                        : available
                          ? 'border-border hover:border-primary/50'
                          : 'border-border opacity-30 cursor-not-allowed'
                    }`}
                  >
                    {val.swatchImage && typeof val.swatchImage === 'object' ? (
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <Media resource={val.swatchImage} imgClassName="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: val.swatchColor || '#ccc' }}
                      />
                    )}
                    {!available && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[2px] h-full bg-muted-foreground/50 rotate-45 absolute" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          ) : option.displayType === 'dropdown' ? (
            <select
              value={selections[option.name] || ''}
              onChange={(e) => handleSelect(option.name, e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="" disabled>
                Select {option.name}
              </option>
              {option.values.map((val) => {
                const available = isValueAvailable(option.name, val.value)
                return (
                  <option key={val.value} value={val.value} disabled={!available}>
                    {val.value}
                    {!available ? ' (Sold Out)' : ''}
                  </option>
                )
              })}
            </select>
          ) : (
            <div className="flex flex-wrap gap-2">
              {option.values.map((val) => {
                const isSelected = selections[option.name] === val.value
                const available = isValueAvailable(option.name, val.value)

                return (
                  <button
                    key={val.value}
                    onClick={() => handleSelect(option.name, val.value)}
                    disabled={!available}
                    className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : available
                          ? 'border-border hover:border-primary'
                          : 'border-border text-muted-foreground/50 cursor-not-allowed line-through'
                    }`}
                  >
                    {val.value}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
