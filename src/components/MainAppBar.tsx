import { AppBar, IconButton, Toolbar } from "@mui/material";
import { Stack } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { MouseEventHandler } from "react";
import { useLocation } from "react-router-dom";
import FilterMenu from "./FilterMenu";
import SearchBar from "./SearchBar";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useAppDispatch } from "../hooks/hooks";
import { logOut } from "../store/slices/login-slice";
type Props = {};

const MainAppBar = (props: Props) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleLogOut: MouseEventHandler = () => {
    dispatch(logOut());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="end"
          alignItems="center"
          width="100%"
        >
          {location.pathname === "/" ? (
            <>
              <SearchBar />
              <FilterMenu />
              <IconButton
                sx={{
                  border: "solid 1px",
                  borderRadius: "4px",
                  borderColor: "rgba(240, 248, 255, 0.15)",
                }}
                onClick={handleLogOut}
              >
                <LogoutIcon fontSize="small" sx={{ color: "white" }} />
              </IconButton>
            </>
          ) : (
            <IconButton
              sx={{
                border: "solid 1px",
                borderRadius: "4px",
                borderColor: "rgba(240, 248, 255, 0.15)",
              }}
            >
              <KeyboardReturnIcon fontSize="small" sx={{ color: "white" }} />
            </IconButton>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
