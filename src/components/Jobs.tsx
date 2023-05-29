import { SetStateAction, useEffect } from "react";
import { Link } from "react-router-dom";
import { Data } from "../Data";

type JobsProps = {
  data: Data | undefined;
  search: string;
  getData: () => void;
};

const Jobs = ({ data, search, getData }: JobsProps) => {
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <div className="mt-[57px] grid gap-12">
      {data && !search
        ? data.map((job) => {
            return (
              <div
                key={job.id}
                className="relative mx-6 rounded-md bg-white dark:bg-very-dark-blue"
              >
                <div
                  style={{
                    background: job.logoBackground,
                  }}
                  className="absolute -top-6 left-8 flex h-[50px] w-[50px] items-center justify-center rounded-2xl"
                >
                  <img src={job.logo} alt={job.company} />
                </div>
                <div className="pb-8 pl-8 pr-2 pt-[50px]">
                  <div className="flex items-end gap-3">
                    <p className="text-base font-normal text-dark-gray">
                      {job.postedAt}
                    </p>
                    <div className="mb-[6px] h-1 w-1 rounded-full bg-dark-gray"></div>
                    <p className="text-base font-normal text-dark-gray">
                      {job.contract}
                    </p>
                  </div>
                  <Link
                    to={`/${job.id}`}
                    className="mt-4 text-xl font-bold text-very-dark-blue dark:text-white"
                  >
                    {job.position}
                  </Link>
                  <p className="mt-4 text-base font-normal text-dark-gray">
                    {job.company}
                  </p>
                  <p className="mt-11 text-sm font-bold text-violet">
                    {job.location}
                  </p>
                </div>
              </div>
            );
          })
        : data
            ?.filter((job) => job.position.toLowerCase().includes(search))
            .map((job) => {
              return (
                <div
                  key={job.id}
                  className="relative mx-6 rounded-md bg-white dark:bg-very-dark-blue"
                >
                  <div
                    style={{
                      background: job.logoBackground,
                    }}
                    className="absolute -top-6 left-8 flex h-[50px] w-[50px] items-center justify-center rounded-2xl"
                  >
                    <img src={job.logo} alt={job.company} />
                  </div>
                  <div className="pb-8 pl-8 pr-2 pt-[50px]">
                    <div className="flex items-end gap-3">
                      <p className="text-base font-normal text-dark-gray">
                        {job.postedAt}
                      </p>
                      <div className="mb-[6px] h-1 w-1 rounded-full bg-dark-gray"></div>
                      <p className="text-base font-normal text-dark-gray">
                        {job.contract}
                      </p>
                    </div>
                    <Link
                      to={`/${job.id}`}
                      className="mt-4 text-xl font-bold text-very-dark-blue dark:text-white"
                    >
                      {job.position}
                    </Link>
                    <p className="mt-4 text-base font-normal text-dark-gray">
                      {job.company}
                    </p>
                    <p className="mt-11 text-sm font-bold text-violet">
                      {job.location}
                    </p>
                  </div>
                </div>
              );
            })}
    </div>
  );
};

export default Jobs;
