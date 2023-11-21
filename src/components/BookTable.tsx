import { IBook } from "../models/Book";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { MdDelete, MdOutlineEdit } from "react-icons/md";

type Props = {
  books: IBook[];
};

const BookTable = (props: Props) => {
  const { books } = props;

  const navigate = useNavigate();
  const handleEdit = (id: string) => {
    navigate(`edit/${id}`);
  };

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Título
          </th>
          <th scope="col" className="px-6 py-3">
            Autor
          </th>
          <th scope="col" className="px-6 py-3">
            Rate
          </th>
          <th scope="col" className="px-6 py-3">
            Tools
          </th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {book.titulo}
            </th>
            <td className="px-6 py-4">{book.autor}</td>
            <td className="px-6 py-4">{book.calificacion}</td>
            <td className="px-6 py-4 flex gap-x-2">
              <Button color="failure">
                <MdDelete className="h-5 w-5" />
              </Button>
              <Button
                color="warning"
                onClick={() => {
                  handleEdit(book.id);
                }}
              >
                <MdOutlineEdit className="h-5 w-5" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
