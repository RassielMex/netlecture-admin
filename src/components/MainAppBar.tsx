import { useLocation, useNavigate } from "react-router-dom";
import FilterMenu from "./FilterMenu";
import SearchBar from "./SearchBar";
import { useAppDispatch } from "../hooks/hooks";
import { logOut } from "../store/slices/login-slice";
import { Button, Navbar } from "flowbite-react";
import { MouseEventHandler } from "react";
import {
  ArrowLeftOnRectangleIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/solid";
type Props = {};

const MainAppBar = (props: Props) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut: MouseEventHandler = () => {
    dispatch(logOut());
  };
  const handleReturn: MouseEventHandler = () => {
    navigate("/", { replace: true });
  };
  return (
    <Navbar fluid className="bg-blue-600 mb-4">
      <div className="flex justify-end w-full">
        <Navbar.Toggle />
        <Navbar.Collapse>
          {location.pathname === "/" ? (
            <>
              <SearchBar />
              <FilterMenu />
              <Button color="blue" onClick={handleLogOut}>
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button color="blue" onClick={handleReturn}>
              <ArrowUturnLeftIcon className="h-5 w-5" />
            </Button>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default MainAppBar;
