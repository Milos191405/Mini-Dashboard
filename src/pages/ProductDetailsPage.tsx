import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { fetchProductById } from "../features/products/productsSlice";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import ProductImages from "../components/ProductImages";
import ProductInfo from "../components/ProductInfo";
import { Card, Box, Typography, Button } from "@mui/material";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const navigate = useNavigate();
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

  if (Number.isNaN(productId) || productId <= 0) {
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
    <>
      <Card
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <ProductImages product={product} />
        <ProductInfo product={product} />
      </Card>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ mt: 2, color: "green", borderColor: "green" }}
      >
        Back
      </Button>
    </>
  );
};

export default ProductDetailsPage;
