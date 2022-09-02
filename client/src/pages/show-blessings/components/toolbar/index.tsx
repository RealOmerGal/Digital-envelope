import { Search } from "@mui/icons-material";
import {
  Card,
  Box,
  Input,
  InputAdornment,
  TextField,
  OutlinedInput,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { ToolbarContainer } from "../../../../components/toolbar/styles";
import { SortOptions } from "../../../../types/sort-options";

interface ToolbarProps {
  handleSearch: (e: any) => void;
  handleSort: (e: any) => void;
  selected: string;
}

const BlessingsToolbar = ({
  handleSearch,
  handleSort,
  selected,
}: ToolbarProps) => {
  return (
    <Card>
      <ToolbarContainer>
        <Box sx={{ p: 1, flexGrow: 2 }}>
          <OutlinedInput
            fullWidth
            placeholder="Search..."
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
          />
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Typography>Sort by &nbsp;</Typography>
          <Select onChange={handleSort} value={selected}>
            {Object.keys(SortOptions).map((option) => (
              <MenuItem key={option} value={option}>
                {
                  //@ts-ignore
                  SortOptions[option]
                }
              </MenuItem>
            ))}
          </Select>
        </Box>
      </ToolbarContainer>
    </Card>
  );
};
export default BlessingsToolbar;
