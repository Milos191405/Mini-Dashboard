import { Box, Pagination } from "@mui/material";

const PaginationControls = ({ currentPage, totalPages, onPageChange }: any) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
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