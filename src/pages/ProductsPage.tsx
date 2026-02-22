import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../app/store";
import { fetchProducts } from "../features/products/productsSlice";
import { useFilteredProducts } from "../hooks/useFilteredProducts";
import ProductsTable from "../components/ProductsTable";
import SearchBar from "../components/SearchBar";
import SortControls from "../components/SortControls";
import {
  CircularProgress,
  Button,
  Typography,
  Box,
  Stack,
} from "@mui/material";

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

  if (status === "loading") {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
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
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (!filteredProducts.length) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography>No products match your search.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Search & Sort controls */}
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
        >
          Reset
        </Button>
      </Stack>

      <ProductsTable products={filteredProducts} />
    </Box>
  );
};

export default ProductsPage;
