import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Product, ProductsResponse, FilterState, Category } from "@/lib/types";

export function useProducts() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    priceRange: [0, 2000],
    sortBy: '',
  });

  const { data: productsData, isLoading, error } = useQuery<ProductsResponse>({
    queryKey: ["/api/products", { limit: 300 }],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/products/categories"],
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const filteredProducts = useMemo(() => {
    if (!productsData?.products) return [];

    let filtered = productsData.products.filter(product => {
      const matchesSearch = filters.search === '' || 
        product.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.brand?.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = filters.category === '' || product.category === filters.category;
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'name-desc':
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'rating-desc':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    return filtered;
  }, [productsData?.products, filters]);

  return {
    products: filteredProducts,
    allProducts: productsData?.products || [],
    categories: categories || [],
    isLoading,
    error,
    filters,
    setFilters,
    totalProducts: filteredProducts.length,
  };
}
