import { useMemo } from "react";

export const useDashboardStats = (products, orders) => {
  return useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const lowStockProducts = products.filter((p) => p.stock < 20).length;

    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      lowStockProducts,
    };
  }, [products, orders]);
};
