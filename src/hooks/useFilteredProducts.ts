import { useMemo } from "react";
import type { Product } from "../features/products/types";

interface UseFilteredProductsProps {
  products: Product[];
  query: string;
  sortField: "price" | "title" | "id";
  sortOrder: "asc" | "desc";
}

export const useFilteredProducts = ({
  products,
  query,
  sortField,
  sortOrder,
}: UseFilteredProductsProps) => {
  return useMemo(() => {
    let filtered = products;

    // Search filter
    if (query.trim()) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    // Sort
    filtered = filtered.slice().sort((a, b) => {
      if (sortField === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortField === "id") {
        return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
      } else {
        const ta = a.title.toLowerCase();
        const tb = b.title.toLowerCase();
        if (ta < tb) return sortOrder === "asc" ? -1 : 1;
        if (ta > tb) return sortOrder === "asc" ? 1 : -1;
        return 0;
      }
    });

    return filtered;
  }, [products, query, sortField, sortOrder]);
};
