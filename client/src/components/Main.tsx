import { useQuery } from "@tanstack/react-query";
import React, { SetStateAction, useState } from "react";
import { FilterTypes, JobData } from "../types";
import Filter from "./Filter";
import Header from "./Header";
import Jobs from "./Jobs";
import Search from "./Search";

type MainProps = {
  setDark: React.Dispatch<SetStateAction<boolean>>;
  width: number;
  fetchData: () => Promise<JobData[]>;
};

const Main = ({ width, setDark, fetchData }: MainProps) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const { isLoading, error, data } = useQuery<JobData[]>({
    queryKey: ["jobListings"],
    queryFn: fetchData,
  });

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

      <Jobs loadMore={loadMore} data={data} filters={filters} />
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
