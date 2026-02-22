import React, { useState } from "react";
import { Box, CardMedia } from "@mui/material";
import type { ProductDetails } from "../features/products/types";
import GreenSpinner from "./GreenSpinner";

interface ProductImagesProps {
  product: ProductDetails;
}

const ProductImages: React.FC<ProductImagesProps> = ({ product }) => {
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  // Initialize loaded state when images change
  React.useEffect(() => {
    if (product?.images) {
      setImagesLoaded(new Array(product.images.length).fill(false));
    }
  }, [product?.images]);

  return (
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
            <GreenSpinner />
          </Box>
        )}
        <CardMedia
          component="img"
          sx={{
            width: 300,
            objectFit: "cover",
            display: thumbnailLoaded ? "block" : "none",
          }}
          image={product.thumbnail}
          alt={product.title}
          onLoad={() => setThumbnailLoaded(true)}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
        {product.images?.map((img, idx) => (
          <Box key={img} sx={{ width: 70, height: 70, position: "relative" }}>
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
                <GreenSpinner size={20} />
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
  );
};

export default ProductImages;
