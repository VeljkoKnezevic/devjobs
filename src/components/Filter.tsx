/* eslint-disable jsx-a11y/label-has-associated-control */
import Checkbox from "rc-checkbox";
import { FormEvent, SetStateAction, useState } from "react";
import { FilterTypes } from "../Data";

type FilterProps = {
  filters: FilterTypes;
  setFilters: React.Dispatch<SetStateAction<FilterTypes>>;
  setOpenFilter: React.Dispatch<SetStateAction<boolean>>;
};

const Filter = ({ filters, setFilters, setOpenFilter }: FilterProps) => {
  const [filtersCopy, setFiltersCopy] = useState({ ...filters });

  const handleFilterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFilters((prev) => ({
      ...prev,
      fullTime: filtersCopy.fullTime,
      location: filtersCopy.location,
    }));
    setOpenFilter(false);
  };

  return (
    <form
      onSubmit={handleFilterSubmit}
      className="absolute left-6 top-56 z-20 w-[327px] bg-white"
    >
      <div className="flex gap-4 border-b-[1px] border-dark-gray border-opacity-20 p-6">
        <img src="/assets/desktop/icon-location.svg" alt="" />
        <input
          value={filtersCopy.location}
          onChange={(e) =>
            setFiltersCopy((prev) => ({ ...prev, location: e.target.value }))
          }
          type="text"
          placeholder="Filter by location..."
        />
      </div>
      <div className="flex flex-col p-6">
        <label
          htmlFor="checkbox"
          className="text-base font-bold text-very-dark-blue"
        >
          <Checkbox
            id="checkbox"
            checked={filtersCopy.fullTime}
            onChange={() =>
              setFiltersCopy((prev) => ({ ...prev, fullTime: !prev.fullTime }))
            }
            className="mr-2"
          />
          Full Time Only
        </label>
        <button
          type="submit"
          className="mt-10 rounded-md bg-violet px-12 py-4 text-base font-bold text-white"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Filter;
