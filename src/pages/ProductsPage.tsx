import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../app/store";
import { fetchProducts } from "../features/products/productsSlice";
import { useFilteredProducts } from "../hooks/useFilteredProducts";
import ProductsTable from "../components/ProductsTable";
import SearchBar from "../components/SearchBar";
import SortControls from "../components/SortControls";
import EmptyState from "../components/EmptyState";
import PaginationControls from "../components/PaginationControls";
import { Button, Typography, Box, Stack } from "@mui/material";
import GreenSpinner from "../components/GreenSpinner";

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products,
  );

  //  search and sort
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sortField, setSortField] = useState<"price" | "title" | "id">("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // Update URL when query changes
  useEffect(() => {
    if (query.trim()) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  }, [query, setSearchParams]);

  // Filter and sort products
  const filteredProducts = useFilteredProducts({
    products,
    query,
    sortField,
    sortOrder,
  });

  //
  useEffect(() => {
    setCurrentPage(1);
  }, [query, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (status === "loading") {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <GreenSpinner />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Box textAlign="center" mt={5}>
        <Typography color="error">{error ?? "An error occurred"}</Typography>
        <Button
          variant="contained"
          onClick={() => dispatch(fetchProducts())}
          sx={{ mt: 2, backgroundColor: "green" }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (!paginatedProducts.length && filteredProducts.length === 0) {
    return (
      <EmptyState
        message="No products match your search."
        onBack={() => {
          setQuery("");
          setSortField("id");
          setSortOrder("asc");
        }}
      />
    );
  }

  return (
    <Box>
      {/* Search & Sort */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        mb={10}
        alignItems="center"
      >
        <SearchBar value={query} onChange={setQuery} />

        <SortControls
          sortField={sortField}
          sortOrder={sortOrder}
          onSortFieldChange={setSortField}
          onSortOrderToggle={() =>
            setSortOrder((o) => (o === "asc" ? "desc" : "asc"))
          }
        />

        <Button
          variant="outlined"
          onClick={() => {
            setQuery("");
            setSortField("id");
            setSortOrder("asc");
          }}
          sx={{ mt: 2, color: "green", borderColor: "green" }}
        >
          Reset
        </Button>
      </Stack>

      <ProductsTable products={paginatedProducts} />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Box>
  );
};

export default ProductsPage;
