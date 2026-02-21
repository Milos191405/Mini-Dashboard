import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { fetchProducts } from "../features/products/productsSlice";
import ProductsTable from "../components/ProductsTable";
import { CircularProgress, Button, Typography, Box } from "@mui/material";

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

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

  if (!products || products.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography>No products found</Typography>
      </Box>
    );
  }

  return <ProductsTable products={products} />;
};

export default ProductsPage;
