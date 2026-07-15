import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config })

    const { user } = await payload.auth({ headers: req.headers })
    if (!user || (user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const text = await file.text()
    const lines = text.split('\n').filter((l) => l.trim())
    const csvHeaders = parseCSVLine(lines[0])

    const results = { created: 0, updated: 0, errors: [] as string[] }

    for (let i = 1; i < lines.length; i++) {
      try {
        const values = parseCSVLine(lines[i])
        const row: Record<string, string> = {}
        csvHeaders.forEach((h, idx) => { row[h.trim()] = (values[idx] || '').trim() })

        const productData: any = {
          title: row['Title'],
          status: row['Status'] || 'draft',
          productType: row['Product Type'] || 'physical',
          price: parseInt(row['Price (pence)'] || '0', 10) || undefined,
          compareAtPrice: row['Compare At Price'] ? parseInt(row['Compare At Price'], 10) : undefined,
          taxClass: row['Tax Class'] || 'standard',
          stock: row['Stock'] ? parseInt(row['Stock'], 10) : undefined,
          trackStock: row['Track Stock']?.toLowerCase() === 'yes',
          lowStockThreshold: row['Low Stock Threshold'] ? parseInt(row['Low Stock Threshold'], 10) : undefined,
          weight: row['Weight (g)'] ? parseInt(row['Weight (g)'], 10) : undefined,
          shippingClass: row['Shipping Class'] || 'standard',
          featured: row['Featured']?.toLowerCase() === 'yes',
          shortDescription: row['Short Description'] || undefined,
        }

        if (row['ID']) {
          try {
            await payload.update({ collection: 'products', id: row['ID'], data: productData })
            results.updated++
            continue
          } catch {
            // Product not found by ID — fall through to create
          }
        }

        if (row['Category']) {
          const cats = await payload.find({
            collection: 'product-categories',
            where: { title: { equals: row['Category'] } },
            limit: 1,
          })
          if (cats.docs[0]) productData.category = cats.docs[0].id
        }

        await payload.create({ collection: 'products', data: productData })
        results.created++
      } catch (error: any) {
        results.errors.push(`Row ${i + 1}: ${error.message}`)
      }
    }

    return NextResponse.json(results)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}
