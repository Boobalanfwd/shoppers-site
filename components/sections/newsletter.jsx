'use client'

import { motion } from 'framer-motion'
import { Mail, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Newsletter() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="bg-white/20 rounded-full p-4"
                >
                  <Gift className="h-12 w-12" />
                </motion.div>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold">
                Get Exclusive Deals & Updates
              </h2>
              
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about new products, 
                special offers, and exclusive discounts up to 50% off!
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/70 focus:bg-white/20"
                  />
                </div>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                >
                  Subscribe
                </Button>
              </div>
              
              <p className="text-sm opacity-75 mt-4">
                Join 50,000+ subscribers. No spam, unsubscribe anytime.
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold">50%</div>
                <div className="text-sm opacity-90">Exclusive Discounts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24h</div>
                <div className="text-sm opacity-90">Early Access</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm opacity-90">Shipping Offers</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
