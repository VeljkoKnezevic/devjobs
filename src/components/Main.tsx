import React, { SetStateAction, useState } from "react";
import Search from "./Search";
import Jobs from "./Jobs";
import Header from "./Header";
import { Data, FilterTypes } from "../Data";
import Filter from "./Filter";

type MainProps = {
  dark: boolean;
  setDark: React.Dispatch<SetStateAction<boolean>>;
  data: Data | undefined;

  getData: () => void;
};

const Main = ({ dark, setDark, data, getData }: MainProps) => {
  const [openFilter, setOpenFilter] = useState(false);

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
      <Header dark={dark} setDark={setDark} />
      <Search
        filters={filters}
        setOpenFilter={setOpenFilter}
        setFilters={setFilters}
      />

      <Jobs data={data} filters={filters} getData={getData} />
      <button
        className="text-bold mx-auto mt-8 block bg-violet px-8 py-4  text-base text-white"
        type="button"
      >
        Load More
      </button>
    </main>
  );
};

export default Main;
