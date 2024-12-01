/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormEvent, SetStateAction, useState } from "react";
import { FilterTypes } from "../types";

type FilterProps = {
  filters: FilterTypes;
  setFilters: React.Dispatch<SetStateAction<FilterTypes>>;
  setOpenFilter: React.Dispatch<SetStateAction<boolean>>;
};

const Filter = ({ filters, setFilters, setOpenFilter }: FilterProps) => {
  // This is a mobile only component
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
      className="absolute left-6 top-56 z-20 w-[327px] bg-white dark:bg-very-dark-blue"
    >
      <div className="flex gap-4 border-b-[1px] border-dark-gray border-opacity-20 p-6">
        <img src="/assets/desktop/icon-location.svg" alt="" />
        <input
          className="text-very-dark-blue dark:bg-very-dark-blue dark:text-white"
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
          className="flex gap-4 text-base font-bold text-very-dark-blue dark:text-white"
        >
          <input
            type="checkbox"
            id="checkbox"
            checked={filtersCopy.fullTime}
            onChange={() =>
              setFiltersCopy((prev) => ({ ...prev, fullTime: !prev.fullTime }))
            }
            className="h-6 w-6 appearance-none rounded-[3px] bg-very-dark-blue bg-opacity-10 bg-center bg-no-repeat checked:bg-violet checked:bg-[url(/assets/desktop/icon-check.svg)] dark:bg-white dark:bg-opacity-10 dark:checked:bg-violet"
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
