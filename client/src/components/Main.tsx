import React, { SetStateAction, useState } from "react";
import Search from "./Search";
import Jobs from "./Jobs";
import Header from "./Header";
import { Data, FilterTypes } from "../Data";
import Filter from "./Filter";

type MainProps = {
  setDark: React.Dispatch<SetStateAction<boolean>>;
  data: Data | undefined;
  width: number;
  getData: () => void;
};

const Main = ({ width, setDark, data, getData }: MainProps) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const [filters, setFilters] = useState<FilterTypes>({
    search: "",
    fullTime: false,
    location: "",
  });
  return (
    <main className="h-full w-full bg-light-gray pb-16 font-kumbh dark:bg-midnight">
      {openFilter && (
        <>
          <div
            role="button"
            tabIndex={0}
            aria-label="Exit the filter"
            onClick={() => setOpenFilter(false)}
            onKeyDown={() => setOpenFilter(false)}
            className="absolute z-10 h-full w-full  bg-[#111] opacity-40"
          ></div>
          <Filter
            setOpenFilter={setOpenFilter}
            filters={filters}
            setFilters={setFilters}
          />
        </>
      )}
      <Header setDark={setDark} />
      <Search
        width={width}
        filters={filters}
        setOpenFilter={setOpenFilter}
        setFilters={setFilters}
      />

      <Jobs
        loadMore={loadMore}
        data={data}
        filters={filters}
        getData={getData}
      />
      {!loadMore && (
        <button
          className="text-bold mx-auto mt-8 block rounded bg-violet px-8 py-4 text-base text-white  hover:cursor-pointer hover:bg-light-violet"
          type="button"
          onClick={() => setLoadMore(true)}
        >
          Load More
        </button>
      )}
    </main>
  );
};

export default Main;
