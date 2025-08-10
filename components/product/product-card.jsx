'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'

export function ProductCard({ product }) {
  const mainVariant = product.variants[0]
  const originalPrice = mainVariant?.price || 0
  const discountedPrice = product.discount 
    ? originalPrice * (1 - product.discount / 100)
    : originalPrice

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.imageUrl || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Discount Badge */}
          {product.discount && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              -{product.discount}%
            </Badge>
          )}

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="icon" variant="secondary" className="h-8 w-8">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Add to Cart Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <Button className="w-full" size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            {/* Category & Brand */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{product.category}</span>
              <span>{product.brand}</span>
            </div>

            {/* Product Name */}
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-sm hover:text-primary transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">(4.0)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg">
                {formatPrice(discountedPrice)}
              </span>
              {product.discount && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="text-xs">
              {mainVariant?.stock > 0 ? (
                <span className="text-green-600">In Stock ({mainVariant.stock})</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
