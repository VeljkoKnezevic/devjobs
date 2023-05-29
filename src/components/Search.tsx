import { SetStateAction } from "react";

type SearchProps = {
  search: string;
  setSearch: React.Dispatch<SetStateAction<string>>;
};

const Search = ({ search, setSearch }: SearchProps) => {
  const handleFilter = () => {};

  const handleSubmit = () => {};

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-6 -mt-10 flex items-center justify-between rounded-md bg-white p-4 dark:bg-very-dark-blue"
    >
      <input
        className="dark:bg-very-dark-blue"
        type="text"
        placeholder="Filter by title..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="bg-[url(/assets/mobile/icon-filter.svg)] bg-center bg-no-repeat p-[10px]"
        type="button"
        aria-label="filter"
        onClick={handleFilter}
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
