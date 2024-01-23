import React, { useEffect, useState } from "react";
import {
  Button,
  Label,
  Select,
  TextInput,
  Textarea,
  ToggleSwitch,
} from "flowbite-react";
import { FaBook } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "../../store/slices/books-slice";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Rate from "../Rate";
import {
  getValidExtensions,
  isValidFileType,
} from "../../utils/ValidFileExtensions";
import { IForm } from "../../models/Form";

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
  const token = useAppSelector((state) => {
    return state.login.accessToken;
  });
  const [rateValue, setRateValue] = useState(book?.rate || 1);
  const [selectedURLImage, setSelectedURLImage] = useState<string>(
    book?.image || ""
  );
  const handleRateValueChange = (value: number) => {
    setRateValue(value);
  };
  const handleCancel = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (id) {
      dispatch(getBookById(id, token));
    }
  }, [id, token, dispatch]);

  const validationSchema: Yup.Schema<IForm> = Yup.object({
    title: Yup.string().required("El Titulo es requerido"),
    author: Yup.string().required("El Autor es requerido"),
    summary: Yup.string()
      .optional()
      .max(200, "Longitud debe ser menor a 200 caracteres"),
    grade: Yup.string().required(),
    enableImageUpload: Yup.boolean().required(),
    image: Yup.mixed<File>().when("enableImageUpload", {
      is: true,
      then: (schema) =>
        schema
          .test("Selected File", "Selecciona una archivo", (val) => {
            return val && val?.type.length > 0;
          })
          .test("File Type", "Tipo de Archivo Invalido", (val) => {
            return val && isValidFileType(val?.name, "image");
          })
          .test("File Syze", "Tamaño debe ser menor a 5Mb", (val) => {
            return val && val?.size < 5000000;
          }),
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
            enableImageUpload: false,
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
                  {selectedURLImage ? (
                    <img
                      className="w-full max-w-lg h-128"
                      alt="imagebook"
                      src={selectedURLImage}
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
                    {formik.touched.title && formik.errors.title && (
                      <p className="text-red-500">{formik.errors.title}</p>
                    )}
                    <Label htmlFor="author" value="Autor" />
                    <TextInput
                      id="author"
                      icon={MdAccountCircle}
                      placeholder="Miguel de Cervantes"
                      {...formik.getFieldProps("author")}
                    />
                    {formik.touched.author && formik.errors.author && (
                      <p className="text-red-500">{formik.errors.author}</p>
                    )}
                    <Label htmlFor="summary" value="Reseña" />
                    <Textarea
                      id="summary"
                      placeholder="Este es trata sobre..."
                      rows={4}
                      {...formik.getFieldProps("summary")}
                    />
                    {formik.touched.summary && formik.errors.summary && (
                      <p className="text-red-500">{formik.errors.summary}</p>
                    )}
                    <Rate
                      onValueChange={handleRateValueChange}
                      initalValue={book?.rate || 1}
                    />
                    <Label htmlFor="grade" value="Grado:" />
                    <Select id="grade" {...formik.getFieldProps("grade")}>
                      <option value={"1ro"}>Primero</option>
                      <option value={"2do"}>Segundo</option>
                      <option value={"3ro"}>Tercero</option>
                    </Select>
                    {formik.touched.grade && formik.errors.grade && (
                      <p className="text-red-500">{formik.errors.grade}</p>
                    )}
                    <ToggleSwitch
                      id="enableImageUpload"
                      label="Editar imagen"
                      checked={formik.values.enableImageUpload}
                      onChange={(checked) => {
                        formik.setFieldValue("enableImageUpload", checked);
                      }}
                    />
                    <div
                      className={`relative bg-gray-600 text-white rounded-md w-56 ${
                        formik.values.enableImageUpload
                          ? "visible"
                          : "invisible"
                      }`}
                    >
                      <span className="absolute left-0 top-0 w-full h-full flex justify-center items-center">
                        Seleccione una imagen
                      </span>
                      <input
                        className="opacity-0 w-full hover:cursor-pointer"
                        disabled={!formik.values.enableImageUpload}
                        type="file"
                        id="image"
                        accept={getValidExtensions("image")}
                        onChange={(e) => {
                          if (e.currentTarget.files) {
                            let file = e.currentTarget.files[0];
                            setSelectedURLImage(URL.createObjectURL(file));
                            formik.setFieldValue("image", file);
                          }
                        }}
                      />
                    </div>
                    {formik.touched.image && formik.errors.image && (
                      <p className="text-red-500">{formik.errors.image}</p>
                    )}
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
