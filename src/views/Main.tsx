import { Link, Outlet } from "react-router-dom";
import MainAppBar from "../components/MainAppBar";
import { Sidebar } from "flowbite-react";

type Props = {};

const Main = (props: Props) => {
  return (
    <>
      <MainAppBar />
      <div className="flex gap-2">
        <Sidebar aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item>
                <Link to={"authors"}>Autores</Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to={"genres"}>Generos</Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to={"/admin"}>Libros</Link>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <Outlet />
      </div>
    </>
  );
};

export default Main;
