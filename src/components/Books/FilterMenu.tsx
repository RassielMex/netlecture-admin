import React from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { Checkbox, Dropdown, Label } from "flowbite-react";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { grade } from "../../models/Book";
import { setFilters } from "../../store/slices/books-slice";

type Props = {};

const FilterMenu = (props: Props) => {
  const dispatch = useAppDispatch();
  const options = [grade.First, grade.Second, grade.Third];
  let selectedOptions: grade[] = [grade.First];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.currentTarget;

    if (checked) {
      selectedOptions.push(id as grade);
      dispatch(setFilters(selectedOptions));
    } else {
      selectedOptions = selectedOptions.filter((options) => options !== id);
      dispatch(setFilters(selectedOptions));
    }
    //console.log(selectedOptions);
    //dispatch(filterByGrade(selectedOptions))
  };

  return (
    <>
      <Dropdown
        label={<FunnelIcon className="h-5 w-5" />}
        dismissOnClick={false}
        color="blue"
      >
        {options.map((option, index) => {
          return (
            <Dropdown.Item
              id={option}
              key={index + option}
              className="flex items-center gap-2"
            >
              <Checkbox
                id={option}
                defaultChecked={index === 0 ? true : false}
                onChange={handleChange}
              />
              <Label htmlFor={option}>{option}</Label>
            </Dropdown.Item>
          );
        })}
      </Dropdown>
    </>
  );
};

export default FilterMenu;
