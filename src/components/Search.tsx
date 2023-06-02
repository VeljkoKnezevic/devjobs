import { FormEvent, SetStateAction } from "react";
import { FilterTypes } from "../Data";

type SearchProps = {
  filters: FilterTypes;
  setFilters: React.Dispatch<SetStateAction<FilterTypes>>;
  setOpenFilter: React.Dispatch<SetStateAction<boolean>>;
};

const Search = ({ filters, setFilters, setOpenFilter }: SearchProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const input = form.elements[0] as HTMLInputElement;

    setFilters((prev) => ({ ...prev, search: input.value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-6 -mt-10 flex items-center justify-between rounded-md bg-white p-4 dark:bg-very-dark-blue"
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
