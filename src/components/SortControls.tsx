import React from "react";
import {
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

interface SortControlsProps {
  sortField: "price" | "title" | "id";
  sortOrder: "asc" | "desc";
  onSortFieldChange: (field: "price" | "title" | "id") => void;
  onSortOrderToggle: () => void;
}

const SortControls: React.FC<SortControlsProps> = ({
  sortField,
  onSortFieldChange,
  onSortOrderToggle,
}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="body2" sx={{ fontWeight: 500, color: "green" }}>
        Sort by:
      </Typography>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <Select
          value={sortField}
          onChange={(e) =>
            onSortFieldChange(e.target.value as "price" | "title" | "id")
          }
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "green !important",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "green !important",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "green !important",
            },
            "& .MuiSvgIcon-root": {
              color: "green",
            },
          }}
        >
          <MenuItem value="id">ID</MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="title">Title</MenuItem>
        </Select>
      </FormControl>

      <IconButton onClick={onSortOrderToggle}>
        <SortIcon />
      </IconButton>
    </Stack>
  );
};

export default SortControls;
