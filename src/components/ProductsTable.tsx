import React from "react";
import type { Product } from "../features/products/types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";

interface ProductsTableProps {
  products: Product[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ maxWidth: 50 }}>ID</TableCell>
            <TableCell sx={{maxWidth:50}}>Title</TableCell>
            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
              Category
            </TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
              Stock
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              hover
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/items/${product.id}`)}
            >
              <TableCell sx={{ maxWidth: 50 }}>{product.id}</TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                {product.category}
              </TableCell>
              <TableCell align="right">${product.price}</TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                {product.stock}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
