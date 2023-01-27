import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import React, { ChangeEvent, ChangeEventHandler, useRef } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { filterByTitle } from "../store/slices/books-slices";

type Props = {};

const SearchBar = (props: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleChange: ChangeEventHandler = (event: ChangeEvent) => {
    if (searchRef.current) {
      dispatch(filterByTitle(searchRef.current.value));
    }
  };
  return (
    <>
      <TextField
        inputRef={searchRef}
        onChange={handleChange}
        id="input-with-icon-textfield"
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: "white" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          borderRadius: "8px",
          input: { color: "white" },
          backgroundColor: "rgba(240, 248, 255, 0.15)",
          "& .MuiOutlinedInput-root": {
            "& > fieldset": {
              borderColor: "rgba(240, 248, 255, 0.15)",
              borderRadius: "8px",
            },
          },
          "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": {
              border: "2px solid",
              borderColor: "rgba(240, 248, 255, 0.5)",
            },
          },
        }}
        variant="outlined"
        size="small"
      />
    </>
  );
};

export default SearchBar;
