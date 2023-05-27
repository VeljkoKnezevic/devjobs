import React, { SetStateAction, useState } from "react";
import Search from "./Search";
import Jobs from "./Jobs";
import Header from "./Header";
import { Data } from "../Data";

type MainProps = {
  dark: boolean;
  setDark: React.Dispatch<SetStateAction<boolean>>;
};

const Main = ({ dark, setDark }: MainProps) => {
  const [data, setData] = useState<Data | undefined>();

  return (
    <main className="h-full w-full bg-light-gray pb-16 font-kumbh dark:bg-midnight">
      <Header dark={dark} setDark={setDark} />
      <Search />
      <Jobs data={data} setData={setData} />
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
