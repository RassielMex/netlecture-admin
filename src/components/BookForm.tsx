import React, { useEffect, useState } from "react";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { FaBook } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "../store/slices/books-slice";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Rate from "./Rate";
import {
  getValidExtensions,
  isValidFileType,
} from "../utils/ValidFileExtensions";

const BookForm = () => {
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const book = useAppSelector((state) => {
    return state.books.detailedBook;
  });
  const loading = useAppSelector((state) => {
    return state.books.loading;
  });
  const [rateValue, setRateValue] = useState(book?.rate || 1);
  const handleRateValueChange = (value: number) => {
    setRateValue(value);
  };
  const handleCancel = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (id) {
      dispatch(getBookById(id));
    }
  }, [id, dispatch]);

  interface IForm {
    title?: string;
    author?: string;
    summary?: string;
    grade?: string;
    image?: File;
  }

  const validationSchema: Yup.Schema<IForm> = Yup.object({
    title: Yup.string().required(),
    author: Yup.string().required(),
    summary: Yup.string().required().length(200),
    grade: Yup.string().required(),
    image: Yup.mixed<File>()
      .test("File Type", "Tipo de Archivo Invalido", (val) => {
        return val && isValidFileType(val?.name, "image");
      })
      .test("File Syze", "Tamaño debe ser meno a 5Mb", (val) => {
        return val && val?.size < 5000000;
      }),
  });

  return (
    <>
      {!loading ? (
        <Formik<IForm>
          initialValues={{
            title: book?.title,
            author: book?.author.name,
            summary: book?.summary,
            grade: book?.grade,
            image: new File([], "image", { lastModified: 1 }),
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const books = { ...values, rate: rateValue };
            console.log(books);
          }}
        >
          {(formik) => (
            <div className="container mx-auto">
              <Form className="flex flex-col justify-center align-center gap-4 mb-8">
                <section className="flex flex-col lg:flex-row justify-center align-center items-center gap-4 mb-8">
                  {book?.imgURL ? (
                    <img
                      className="w-full max-w-lg h-128"
                      alt="imagebook"
                      src={book?.imgURL}
                    />
                  ) : (
                    <div className="w-full max-w-lg h-128 bg-not-found bg-no-repeat bg-contain bg-center"></div>
                  )}
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
                    <Rate
                      onValueChange={handleRateValueChange}
                      initalValue={book?.rate || 1}
                    />
                    <Label htmlFor="grade" value="Grado:" />
                    <Select id="grade" {...formik.getFieldProps("grade")}>
                      <option value={"Primero"}>Primero</option>
                      <option value={"Segundo"}>Segundo</option>
                      <option value={"Tercero"}>Tercero</option>
                    </Select>
                    <Label htmlFor="image" value="Seleccione una imagen" />
                    <input
                      type="file"
                      id="image"
                      accept={getValidExtensions("image")}
                      onChange={(e) => {
                        if (e.currentTarget.files) {
                          formik.setFieldValue(
                            "image",
                            e.currentTarget.files[0]
                          );
                        }
                      }}
                    />
                    <p>{formik.errors.image}</p>
                  </div>
                </section>
                <section className="flex gap-4 justify-center w-full">
                  <Button type="submit">Save</Button>
                  <Button onClick={handleCancel}>Cancel</Button>
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
