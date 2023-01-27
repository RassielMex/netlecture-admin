import { IconButton, Menu, MenuItem } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CheckIcon from "@mui/icons-material/Check";
import React from "react";
import { Box } from "@mui/system";

type Props = {};

const FilterMenu = (props: Props) => {
  const options = ["Todos", "Primero", "Segundo", "Tercero"];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    //console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    _event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleButtonClick}
        sx={{
          border: "solid 1px",
          borderRadius: "4px",
          borderColor: "rgba(240, 248, 255, 0.15)",
        }}
      >
        <FilterListIcon fontSize="small" sx={{ color: "white" }} />
      </IconButton>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {index === selectedIndex ? (
              <CheckIcon fontSize="small" sx={{ marginRight: "4px" }} />
            ) : (
              <Box sx={{ width: "24px" }} />
            )}
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default FilterMenu;
