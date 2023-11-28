import React, { useEffect } from "react";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { FaBook } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useParams } from "react-router-dom";
import { getBookById } from "../store/slices/books-slice";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Rate from "./Rate";

const notFoundImg = require("../img/notfound.png");

const BookForm = () => {
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const book = useAppSelector((state) => {
    return state.books.detailedBook;
  });
  const loading = useAppSelector((state) => {
    return state.books.loading;
  });

  const handleRateValueChange = (value: Number) => {
    console.log(value);
  };

  useEffect(() => {
    if (id) {
      dispatch(getBookById(id));
    }
  }, [id, dispatch]);

  return (
    <>
      {!loading ? (
        <Formik
          initialValues={{
            title: book?.title,
            author: book?.author.name,
            summary: "",
            grade: "Primero",
            qualification: book?.rate || 1,
          }}
          validationSchema={Yup.object({
            title: Yup.string().required(),
            author: Yup.string().required(),
            summary: Yup.string().length(200),
            grade: Yup.string().required(),
            qualification: Yup.number().positive().lessThan(6),
          })}
          onSubmit={(values) => {
            values.qualification = 10;
            console.log(values);
          }}
        >
          {(formik) => (
            <div className="container mx-auto">
              <Form className="flex flex-col justify-center align-center gap-4 mb-8">
                <section className="flex flex-col lg:flex-row justify-center align-center items-center gap-4 mb-8">
                  <img
                    className="w-full max-w-lg h-128"
                    alt=""
                    src={notFoundImg}
                  />
                  <div className="flex flex-col justify-center gap-4 w-full max-w-md">
                    <Label htmlFor="title" value="Título" />
                    <TextInput
                      id="title"
                      icon={FaBook}
                      placeholder="El Quijote de la Mancha"
                      {...formik.getFieldProps("title")}
                    />
                    <Label htmlFor="author" value="Autor" />
                    <TextInput
                      id="author"
                      icon={MdAccountCircle}
                      placeholder="Miguel de Cervantes"
                      {...formik.getFieldProps("author")}
                    />
                    <Label htmlFor="summary" value="Reseña" />
                    <Textarea
                      id="summary"
                      placeholder="Este es trata sobre..."
                      rows={4}
                      {...formik.getFieldProps("summary")}
                    />
                    <Label htmlFor="qualification" value="Calificación" />
                    <input
                      id="qualification"
                      {...formik.getFieldProps("qualification")}
                    />
                    <Rate
                      onValueChange={handleRateValueChange}
                      initalValue={1}
                    />
                    <Label htmlFor="grade" value="Grado:" />
                    <Select id="grade" required>
                      <option value={"Primero"}>Primero</option>
                      <option value={"Segundo"}>Segundo</option>
                      <option value={"Tercero"}>Tercero</option>
                    </Select>
                  </div>
                </section>
                <section className="flex gap-4 justify-center w-full">
                  <Button type="submit">Save</Button>
                  <Button>Cancel</Button>
                </section>
              </Form>
            </div>
          )}
        </Formik>
      ) : (
        <div>No data</div>
      )}
    </>
  );
};

export default BookForm;
