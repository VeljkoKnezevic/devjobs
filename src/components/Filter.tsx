/* eslint-disable jsx-a11y/label-has-associated-control */
import Checkbox from "rc-checkbox";
import { FormEvent, SetStateAction } from "react";
import { FilterTypes } from "../Data";

type FilterProps = {
  filters: FilterTypes;
  setFilters: React.Dispatch<SetStateAction<FilterTypes>>;
};

const Filter = ({ filters, setFilters }: FilterProps) => {
  const handleFilterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleFilterSubmit}
      className="absolute left-6 top-56 z-20 w-[327px] bg-white"
    >
      <div className="flex gap-4 border-b-[1px] border-dark-gray border-opacity-20 p-6">
        <img src="/assets/desktop/icon-location.svg" alt="" />
        <input type="text" placeholder="Filter by location..." />
      </div>
      <div className="flex flex-col p-6">
        <label
          htmlFor="checkbox"
          className="text-base font-bold text-very-dark-blue"
        >
          <Checkbox
            id="checkbox"
            checked={filters.fullTime}
            onChange={() =>
              setFilters((prev) => ({ ...prev, fullTime: !prev.fullTime }))
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
