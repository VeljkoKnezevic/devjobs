const Search = () => {
  return (
    <form className="mx-6 -mt-10 flex items-center justify-between rounded-md bg-white p-4 dark:bg-very-dark-blue">
      <input
        className="dark:bg-very-dark-blue"
        type="text"
        placeholder="Filter by title..."
      />
      <button
        className="bg-[url(/assets/mobile/icon-filter.svg)] bg-center bg-no-repeat p-[10px]"
        type="button"
        aria-label="filter"
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
