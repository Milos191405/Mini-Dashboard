import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { fetchProductById } from "../features/products/productsSlice";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Chip,
} from "@mui/material";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const dispatch = useDispatch<AppDispatch>();

  const { products, selectedProduct, status, error } = useSelector(
    (state: RootState) => state.products,
  );

  const productFromList = products.find((p) => p.id === productId);
  const product =
    productFromList ??
    (selectedProduct && selectedProduct.id === productId
      ? selectedProduct
      : undefined);

  useEffect(() => {
    if (!product && !Number.isNaN(productId)) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, product, productId]);

  if (Number.isNaN(productId)) {
    return (
      <Box mt={5} textAlign="center">
        <Typography>Invalid product ID</Typography>
      </Box>
    );
  }

  if (status === "loading" && !product) return <LoadingState />;

  if (status === "failed" && !product) {
    return (
      <ErrorState
        message={error ?? "Failed to load product"}
        onRetry={() => dispatch(fetchProductById(productId))}
      />
    );
  }

  if (!product) {
    return (
      <Box mt={5} textAlign="center">
        <Typography>No product found.</Typography>
      </Box>
    );
  }

  return (
    <Card sx={{ display: "flex", gap: 2, p: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 300, objectFit: "cover" }}
        image={product.thumbnail}
        alt={product.title}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h5" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {product.brand} — {product.category}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          ${product.price}
        </Typography>
        <Typography paragraph>{product.description}</Typography>

        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item>
            <Chip label={`Stock: ${product.stock}`} />
          </Grid>
          <Grid item>
            <Chip label={`Rating: ${product.rating}`} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductDetailsPage;
