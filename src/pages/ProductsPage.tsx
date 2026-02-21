import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { fetchProducts } from "../features/products/productsSlice";
import ProductsTable from "../components/ProductsTable";
import {
  CircularProgress,
  Button,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Stack,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products
  );

  //  search and sort
  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState<"price" | "title" | "id">("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // Filter
  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (query.trim()) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
    }

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

  {/* Search */}
  <TextField
    size="small"
    placeholder="Search by title"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />

  {/* Sort group */}
  <Stack direction="row" spacing={1} alignItems="center">
    <Typography variant="body2" sx={{ fontWeight: 500, color: "green" }}>
      Sort by:
    </Typography>

    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={sortField}
        onChange={(e) =>
          setSortField(e.target.value as "price" | "title" | "id")
        }
      >
        <MenuItem value="id">ID</MenuItem>
        <MenuItem value="price">Price</MenuItem>
        <MenuItem value="title">Title</MenuItem>
      </Select>
    </FormControl>

    <IconButton
      onClick={() => setSortOrder((o) => (o === "asc" ? "desc" : "asc"))}
    >
      <SortIcon />
    </IconButton>
  </Stack>

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