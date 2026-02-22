import React from "react";
import { Box, Pagination } from "@mui/material";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "green",
            "&.Mui-selected": {
              backgroundColor: "green",
              color: "white",
            },
            "&:hover": {
              backgroundColor: "rgba(0, 128, 0, 0.1)",
            },
          },
        }}
      />
    </Box>
  );
};

export default PaginationControls;
