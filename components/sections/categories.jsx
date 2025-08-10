'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Smartphone, Shirt, Watch, Headphones, Camera, Gamepad2 } from 'lucide-react'

const categories = [
  {
    name: 'Electronics',
    icon: Smartphone,
    href: '/categories/electronics',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
    count: '1,200+ items'
  },
  {
    name: 'Fashion',
    icon: Shirt,
    href: '/categories/fashion',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    count: '800+ items'
  },
  {
    name: 'Accessories',
    icon: Watch,
    href: '/categories/accessories',
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
    count: '500+ items'
  },
  {
    name: 'Audio',
    icon: Headphones,
    href: '/categories/audio',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    count: '300+ items'
  },
  {
    name: 'Photography',
    icon: Camera,
    href: '/categories/photography',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
    count: '200+ items'
  },
  {
    name: 'Gaming',
    icon: Gamepad2,
    href: '/categories/gaming',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    count: '400+ items'
  },
]

export function Categories() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you're looking for
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={category.href}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                    </div>
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <div className="flex items-center space-x-3 mb-2">
                        <Icon className="h-6 w-6" />
                        <h3 className="text-xl font-bold">{category.name}</h3>
                      </div>
                      <p className="text-sm opacity-90">{category.count}</p>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
