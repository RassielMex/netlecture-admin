import {
  Box,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import NotesIcon from "@mui/icons-material/Notes";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ImageIcon from "@mui/icons-material/Image";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";

const notFoundImg = require("../img/notfound.png");

type Props = {};

const AddBookContainer = (props: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [grado, setGrado] = useState<number>(1);

  const handleChangeGrado: (event: SelectChangeEvent<number>) => void = (
    event
  ) => {
    setGrado(+event.target.value);
  };

  return (
    <Container>
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="center"
        alignItems="center"
        spacing={4}
        marginBottom="32px"
      >
        <Box
          sx={{
            maxWidth: "480px",
            width: "100%",
            height: "480px",
            backgroundImage: `url(${notFoundImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
        <Stack spacing={4} minWidth={"240px"} maxWidth="480px" width="100%">
          <TextField
            id="title"
            label="Título"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MenuBookIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <TextField
            id="author"
            label="Autor"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <TextField
            id="description"
            label="Reseña"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NotesIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <TextField
            id="urlImag"
            label="Url de la Imagen"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ImageIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <div>
            <Typography component="legend">Calificacion</Typography>
            <Rating
              name="simple-controlled"
              // value={value}
              // onChange={(event, newValue) => {
              //   setValue(newValue);
              // }}
            />
          </div>
          <FormControl>
            <InputLabel id="input-select-label">Grado</InputLabel>
            <Select
              sx={{ maxWidth: "240px" }}
              labelId="selec-label"
              id="grade"
              value={grado}
              label="Grado"
              size={isMobile ? "small" : "medium"}
              onChange={handleChangeGrado}
            >
              <MenuItem value={1}>Primero</MenuItem>
              <MenuItem value={2}>Segundo</MenuItem>
              <MenuItem value={3}>Tercero</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Container>
  );
};

export default AddBookContainer;
