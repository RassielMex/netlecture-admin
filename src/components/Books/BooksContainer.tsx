import { MdOutlineAdd } from "react-icons/md";
import React, { MouseEventHandler, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { emptyDetailedBook, getBooks } from "../../store/slices/books-slice";
import BookTable from "./BookTable";
import { Button, Spinner } from "flowbite-react";
import { requestNewToken } from "../../store/slices/login-slice";

type Props = {};

const BooksContainer = (props: Props) => {
  const dispatch = useAppDispatch();

  const books = useAppSelector((state) => {
    return state.books.books;
  });
  const loading = useAppSelector((state) => {
    return state.books.loading;
  });
  const token = useAppSelector((state) => {
    return state.login.accessToken;
  });
  const refresh = useAppSelector((state) => {
    return state.login.refreshToken;
  });
  const loginDate = useAppSelector((state) => {
    return state.login.loginDate;
  });
  useEffect(() => {
    dispatch(getBooks(token));
  }, [dispatch, token]);
  useEffect(() => {
    dispatch(requestNewToken(refresh, loginDate));
  }, [refresh, loginDate, dispatch]);

  const navigate = useNavigate();
  const handleAdd: MouseEventHandler = () => {
    dispatch(emptyDetailedBook());
    navigate("book/add", { replace: false });
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
