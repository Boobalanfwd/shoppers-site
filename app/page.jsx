'use client'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react'
import { StatsCard } from '@/components/admin/stats-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { orders, products, users } from '@/lib/data'
import { formatPrice, formatDate } from '@/lib/utils'

export default function AdminDashboard() {
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0)
  const totalOrders = orders.length
  const totalCustomers = users.length
  const totalProducts = products.length

  const recentOrders = orders.slice(0, 5)

  const stats = [
    {
      title: 'Total Revenue',
      value: formatPrice(totalRevenue),
      change: '+12.5% from last month',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      change: '+8.2% from last month',
      changeType: 'positive',
      icon: ShoppingCart,
    },
    {
      title: 'Total Customers',
      value: totalCustomers,
      change: '+15.3% from last month',
      changeType: 'positive',
      icon: Users,
    },
    {
      title: 'Total Products',
      value: totalProducts,
      change: '+2 new products',
      changeType: 'neutral',
      icon: Package,
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your store today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Recent Orders</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => {
                    const customer = users.find(u => u.id === order.userId)
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          #{order.id.slice(0, 8)}
                        </TableCell>
                        <TableCell>{customer?.name || 'Unknown'}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Conversion Rate</span>
                </div>
                <span className="text-2xl font-bold text-green-600">3.2%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Average Order Value</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(totalRevenue / totalOrders)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Customer Retention</span>
                </div>
                <span className="text-2xl font-bold text-purple-600">68%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">Products Sold</span>
                </div>
                <span className="text-2xl font-bold text-orange-600">
                  {orders.reduce((sum, order) => sum + order.items.length, 0)}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
