import React, { MouseEvent, useState } from "react";
import {
  Button,
  Label,
  Rating,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { FaBook } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

const notFoundImg = require("../img/notfound.png");

type Props = {};

const EditBookContainer = (props: Props) => {
  const [filled, setFilled] = useState([true, false, false, false, false]);
  const [countOnFirstStar, setCountOnFirstStar] = useState(0);
  const handleEnter = (event: MouseEvent<SVGSVGElement>) => {
    const id = event.currentTarget.id;
    if (id === "0") {
      setCountOnFirstStar((prev) => {
        return prev + 1;
      });
    }
    setFilled((prev) => {
      return prev.map((_val, index) => {
        return index <= Number(id);
      });
    });
  };
  const handleLeave = (event: MouseEvent<SVGSVGElement>) => {
    if (countOnFirstStar > 1) {
      setFilled((prev) => {
        return prev.map((val) => {
          return false;
        });
      });
      setCountOnFirstStar(0);
    }
  }; //const theme = useTheme();
  //const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center align-center gap-4 mb-8">
        <section className="flex flex-col lg:flex-row justify-center align-center items-center gap-4 mb-8">
          <img className="w-full max-w-lg h-128" alt="" src={notFoundImg} />
          <div className="flex flex-col justify-center gap-4 w-full max-w-md">
            <Label htmlFor="title" value="Título" />
            <TextInput
              id="title"
              icon={FaBook}
              placeholder="El Quijote de la Mancha"
              required
            />
            <Label htmlFor="author" value="Autor" />
            <TextInput
              id="author"
              icon={MdAccountCircle}
              placeholder="Miguel de Cervantes"
              required
            />
            <Label htmlFor="description" value="Reseña" />
            <Textarea
              id="description"
              placeholder="Este libro es maravilloso..."
              required
              rows={4}
              maxLength={200}
            />
            <Label htmlFor="rate" value="Calificación" />
            <Rating id="rate">
              <Rating.Star
                id="0"
                filled={filled[0]}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              />
              <Rating.Star
                id="1"
                filled={filled[1]}
                onMouseEnter={handleEnter}
              />
              <Rating.Star
                id="2"
                filled={filled[2]}
                onMouseEnter={handleEnter}
              />
              <Rating.Star
                id="3"
                filled={filled[3]}
                onMouseEnter={handleEnter}
              />
              <Rating.Star
                id="4"
                filled={filled[4]}
                onMouseEnter={handleEnter}
              />
            </Rating>
            <Label htmlFor="ragradete" value="Grado:" />
            <Select id="grade" required>
              <option>Primero</option>
              <option>Segundo</option>
              <option>Tercero</option>
            </Select>
          </div>
        </section>
        <section className="flex gap-4 justify-center w-full">
          <Button>Save</Button>
          <Button>Cancel</Button>
        </section>
      </div>
    </div>
  );
};

export default EditBookContainer;
