import {
  Card,
  CardContent,
  IconButton,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { MouseEventHandler } from "react";
import { Stack } from "@mui/system";
import { IBook } from "../models/Book";
import { useNavigate } from "react-router-dom";

type Props = {
  book: IBook;
};

const BookItem = (props: Props) => {
  const { book } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const limitString = (str: String, limit: number) => {
    if (limit > 3) {
      if (str.length > limit) {
        return str.substring(0, limit - 3) + "...";
      }
    }
    return str;
  };

  const handleEdit: MouseEventHandler = () => {
    navigate(`edit/${book.id}`);
  };

  return (
    <Card
      sx={{
        margin: "8px",
        minWidth: `${isMobile ? "300px" : "500px"}`,
        width: "100%",
        maxWidth: "800px",
      }}
      elevation={2}
    >
      <CardContent>
        <Stack
          direction={isMobile ? "column" : "row"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Typography variant="subtitle2" marginRight="16px">
            Titulo:
            <Typography
              variant="body1"
              marginLeft="8px"
              sx={{ display: "inline-block" }}
            >
              {isMobile
                ? limitString(book.titulo, 40)
                : limitString(book.titulo, 30)}
            </Typography>
          </Typography>
          <Typography variant="subtitle2" marginRight="16px">
            Autor:
            <Typography
              variant="body1"
              marginLeft="8px"
              sx={{ display: "inline-block" }}
            >
              {isMobile
                ? limitString(book.autor, 25)
                : limitString(book.autor, 20)}
            </Typography>
          </Typography>
          <Rating name="read-only" value={book.calificacion} readOnly />
          <Stack direction={"row"} justifyContent="center">
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BookItem;
