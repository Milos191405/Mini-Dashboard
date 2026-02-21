import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const dispatch = useDispatch<AppDispatch>();
  const { products, selectedProduct, status, error } = useSelector(
    (state: RootState) => state.products
  );

  const productFromList = products.find((p) => p.id === productId);
  const product =
    productFromList ?? (selectedProduct && selectedProduct.id === productId ? selectedProduct : undefined);

  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  useEffect(() => {
    if (!product && !Number.isNaN(productId)) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, product, productId]);

  useEffect(() => {
    if (product?.images) {
      setImagesLoaded(new Array(product.images.length).fill(false));
    }
  }, [product?.images]);

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
    <Card sx={{ display: "flex", gap: 2, p: 2, flexDirection: { xs: "column", md: "row" } }}>
      <Box>
        <Box sx={{ width: 300, height: 300, position: "relative" }}>
          {!thumbnailLoaded && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <CardMedia
            component="img"
            sx={{ width: 300, objectFit: "cover", display: thumbnailLoaded ? "block" : "none" }}
            image={product.thumbnail}
            alt={product.title}
            onLoad={() => setThumbnailLoaded(true)}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
          {product.images?.map((img, idx) => (
            <Box key={idx} sx={{ width: 70, height: 70, position: "relative" }}>
              {!imagesLoaded[idx] && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress size={20} />
                </Box>
              )}
              <CardMedia
                component="img"
                sx={{
                  width: 70,
                  height: 70,
                  objectFit: "cover",
                  borderRadius: 1,
                  display: imagesLoaded[idx] ? "block" : "none",
                }}
                image={img}
                alt={`${product.title} ${idx + 1}`}
                onLoad={() => {
                  setImagesLoaded((prev) => {
                    const newArr = [...prev];
                    newArr[idx] = true;
                    return newArr;
                  });
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

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