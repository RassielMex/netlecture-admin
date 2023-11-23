import { MdOutlineAdd } from "react-icons/md";
import React, { MouseEventHandler, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getBooks } from "../store/slices/books-slices";
import BookTable from "./BookTable";
import { Button, Spinner } from "flowbite-react";

type Props = {};

const BooksContainer = (props: Props) => {
  const dispatch = useAppDispatch();

  const books = useAppSelector((state) => {
    return state.books.books;
  });
  const loading = useAppSelector((state) => {
    return state.books.loading;
  });

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const navigate = useNavigate();
  const handleAdd: MouseEventHandler = () => {
    navigate("add", { replace: false });
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col align-center">
        {loading ? <Spinner color="info" /> : <BookTable books={books} />}
      </div>
      <Button
        onClick={handleAdd}
        color="blue"
        pill
        className="fixed right-2 bottom-2"
      >
        <MdOutlineAdd className="h-5 w-5 mr-1" />
        Nuevo
      </Button>
    </div>
  );
};

export default BooksContainer;
