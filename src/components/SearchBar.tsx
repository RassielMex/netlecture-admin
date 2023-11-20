import React, { ChangeEvent, ChangeEventHandler, useRef } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { filterByTitle } from "../store/slices/books-slices";
import { TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";

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
    <TextInput
      id="email4"
      type="email"
      icon={HiSearch}
      placeholder="Search"
      onChange={handleChange}
      ref={searchRef}
    />
  );
};

export default SearchBar;
