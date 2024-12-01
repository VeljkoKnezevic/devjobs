import { FormEvent, SetStateAction } from "react";
import { FilterTypes } from "../types";

type SearchProps = {
  filters: FilterTypes;
  setFilters: React.Dispatch<SetStateAction<FilterTypes>>;
  setOpenFilter: React.Dispatch<SetStateAction<boolean>>;
  width: number;
};

interface FormElements extends HTMLCollection {
  0: HTMLInputElement;
  1: HTMLInputElement;
  2: HTMLInputElement;
}

// eslint-disable-next-line consistent-return
const Search = ({ width, filters, setFilters, setOpenFilter }: SearchProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const elements = form.elements as FormElements;

    if (width < 768) {
      setFilters((prev) => ({ ...prev, search: elements[0].value }));
    } else {
      setFilters((prev) => ({
        ...prev,
        search: elements[0].value,
        location: elements[1].value,
        fullTime: elements[2].checked,
      }));
    }
  };

  if (width >= 768) {
    return (
      <form
        onSubmit={handleSubmit}
        className=" mx-10 -mt-10 flex items-center justify-between rounded-md bg-white pr-4 dark:bg-very-dark-blue xl:mx-40"
      >
        <div className="border-r-[1px] border-dark-gray border-opacity-20 py-7 pl-6 pr-12 xl:pr-[10%] 2xl:pr-[20%]">
          <input
            className="w-36 bg-[url(/assets/desktop/icon-search.svg)] bg-no-repeat pl-10 text-very-dark-blue caret-violet dark:bg-very-dark-blue dark:text-white xl:w-80"
            type="text"
            placeholder={"filter by position"}
            onChange={(e) =>
              filters.search &&
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>

        <div className="border-r-[1px] border-dark-gray border-opacity-20 py-7 pl-6 pr-5 xl:pr-[10%] 2xl:pr-[20%]">
          <input
            className=" w-[169px] bg-[url(/assets/desktop/icon-location.svg)] bg-no-repeat pl-8 text-very-dark-blue caret-violet dark:bg-very-dark-blue dark:text-white"
            type="text"
            placeholder="Filter by location..."
            onChange={(e) =>
              filters.location &&
              setFilters((prev) => ({ ...prev, location: e.target.value }))
            }
          />
        </div>
        <label
          htmlFor="checkbox"
          className="ml-6 flex gap-4 text-base font-bold text-very-dark-blue hover:cursor-pointer dark:text-white xl:ml-8"
        >
          <input
            type="checkbox"
            id="checkbox"
            className="h-6 w-6 appearance-none rounded-[3px] bg-very-dark-blue bg-opacity-10 bg-center bg-no-repeat checked:bg-violet checked:bg-[url(/assets/desktop/icon-check.svg)] hover:cursor-pointer dark:bg-white dark:bg-opacity-10 dark:checked:bg-violet"
            onChange={() =>
              filters.fullTime &&
              setFilters((prev) => ({ ...prev, fullTime: !prev }))
            }
          />
          {width >= 1440 ? "Full Time Only" : "Full Time"}
        </label>

        <button
          className="ml-7 rounded bg-violet px-[14px] py-3 font-bold text-white hover:bg-light-violet xl:px-9"
          type="submit"
        >
          Search
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-6 -mt-10 flex items-center justify-between rounded-md bg-white p-4 dark:bg-very-dark-blue "
    >
      <input
        className="text-very-dark-blue dark:bg-very-dark-blue dark:text-white"
        type="text"
        placeholder="Filter by title..."
        onChange={(e) =>
          filters.search &&
          setFilters((prev) => ({ ...prev, search: e.target.value }))
        }
      />
      <button
        className="bg-[url(/assets/mobile/icon-filter.svg)] bg-center bg-no-repeat p-[10px]"
        type="button"
        aria-label="filter"
        onClick={() => setOpenFilter(true)}
      ></button>
      <button className="rounded bg-violet p-3" type="submit">
        <img
          className="brightness-0 invert"
          src="/assets/desktop/icon-search.svg"
          alt="Search"
        />
      </button>
    </form>
  );
};

export default Search;
