import { Add } from "@mui/icons-material";
import { CircularProgress, Container, Fab } from "@mui/material";
import { Stack } from "@mui/system";
import React, { MouseEventHandler, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { onRetrieve } from "../store/slices/books-slices";
import BookItem from "./BookItem";

type Props = {};

const BooksContainer = (props: Props) => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => {
    return state.books.booksFiltered;
  });
  const loading = useAppSelector((state) => {
    return state.books.loading;
  });

  useEffect(() => {
    dispatch(onRetrieve());
  }, [dispatch]);

  const handleAdd: MouseEventHandler = (event) => {};

  return (
    <Container>
      <Stack alignItems={"center"}>
        {books.map((book, index) => {
          return <BookItem key={index} book={book} />;
        })}
        {books.length === 0 && loading && (
          <>
            <CircularProgress />
          </>
        )}
        {books.length === 0 && !loading && <>No hay resultados!!</>}
      </Stack>
      <Fab
        onClick={handleAdd}
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: "1rem", right: "1rem" }}
      >
        <Add />
      </Fab>
    </Container>
  );
};

export default BooksContainer;
