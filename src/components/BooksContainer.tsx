import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { onRetrieve } from "../store/slices/books-slices";
import BookItem from "./BookItem";

type Props = {};

const BooksContainer = (props: Props) => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => {
    return state.books.booksFiltered;
  });
  useEffect(() => {
    dispatch(onRetrieve());
  }, [dispatch]);

  return (
    <Container>
      <Stack alignItems={"center"}>
        {books.map((book, index) => {
          return <BookItem key={index} book={book} />;
        })}
      </Stack>
    </Container>
  );
};

export default BooksContainer;
