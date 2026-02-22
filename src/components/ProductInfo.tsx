import React from "react";
import { CardContent, Typography, Grid, Chip } from "@mui/material";
import type { ProductDetails } from "../features/products/types";

interface ProductInfoProps {
  product: ProductDetails;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
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
        <Grid size={{ xs: 12 }}>
          <Chip label={`Stock: ${product.stock}`} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Chip label={`Rating: ${product.rating}`} />
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default ProductInfo;
