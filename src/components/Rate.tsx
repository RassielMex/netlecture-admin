import { Rating } from "flowbite-react";
import React, { MouseEvent, useEffect, useState } from "react";

type Props = {
  initalValue: number;
  onValueChange: (value: number) => void;
};

const Rate = (props: Props) => {
  const { onValueChange, initalValue } = props;
  //Rate control
  const initialState = Array<boolean>(5)
    .fill(false)
    .map((_val, index) => {
      return index + 1 <= initalValue;
    });
  const [filled, setFilled] = useState(initialState);
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
        if (index <= Number(id)) {
          return true;
        }
        return false;
      });
    });
  };
  const handleLeave = (_event: MouseEvent<SVGSVGElement>) => {
    if (countOnFirstStar > 1) {
      setFilled((prev) => {
        return prev.map((_val) => {
          return false;
        });
      });
      setCountOnFirstStar(0);
    }
  };

  useEffect(() => {
    let index = 0;
    filled.forEach((element) => {
      if (element) {
        index = index + 1;
      }
    });
    onValueChange(index);
  }, [onValueChange, filled]);

  return (
    <Rating>
      {filled.map((fill, index) => {
        return (
          <Rating.Star
            key={index}
            id={index.toString()}
            filled={fill}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          />
        );
      })}
    </Rating>
  );
};

export default Rate;
