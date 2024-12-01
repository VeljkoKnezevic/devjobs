import { useQuery } from "@tanstack/react-query";
import { SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { JobData } from "../types";
import Header from "./Header";
import JobDescription from "./JobDescription";

type DetailProps = {
  setDark: React.Dispatch<SetStateAction<boolean>>;
  width: number;
  fetchData: () => Promise<JobData[]>;
};

const Detail = ({ width, setDark, fetchData }: DetailProps) => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery<JobData[]>({
    queryKey: ["jobListings"],
    queryFn: fetchData,
  });

  if (error) {
    return (
      <>
        <Header setDark={setDark} />
        <p className="mx-6 mt-5 text-2xl md:mx-10">Error fetching data</p>
        <p>{error.message}</p>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Header setDark={setDark} />
        <p className="mx-6 mt-5 text-2xl md:mx-10">Loading...</p>
      </>
    );
  }

  return (
    <>
      {data &&
        data
          .filter((job) => job.id.toString() === id)
          .map((job) => {
            return (
              <div
                key={job.id}
                className="h-full w-full bg-light-gray font-kumbh dark:bg-midnight"
              >
                <Header setDark={setDark} />
                <section className="relative mx-6 -mt-4 flex flex-col items-center rounded-md bg-white pb-8 pt-12  dark:bg-very-dark-blue md:mx-10 md:-mt-10 md:flex-row md:px-10 md:py-[42px] xl:mx-auto xl:max-w-[730px]">
                  <div className="rounded-2x absolute -top-6 flex  h-12 w-12 items-center justify-center md:left-0 md:top-0 md:block md:h-full md:w-28 md:rounded-t-none md:rounded-bl-md md:rounded-br-none">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="md:pl-[140px]">
                    <h2 className="text-center text-xl font-bold text-very-dark-blue dark:text-white md:text-start md:text-2xl">
                      {job.company}
                    </h2>
                  </div>
                </section>
                <section className="mx-6 mt-6 bg-white px-6 py-10 dark:bg-very-dark-blue md:mx-10 md:mt-8 md:p-12 xl:mx-auto xl:max-w-[730px]">
                  <div className="items-center md:flex">
                    <div>
                      <div className="flex items-end gap-3">
                        <p className="text-base font-normal text-dark-gray">
                          {job.postedAt}
                        </p>
                        <div className="mb-[6px] h-1 w-1 rounded-full bg-dark-gray"></div>
                        <p className="text-base font-normal text-dark-gray">
                          {job.contract}
                        </p>
                      </div>
                      <h2 className="mt-1 text-xl font-bold text-very-dark-blue dark:text-white md:mt-2 md:text-[28px]/[35px]">
                        {job.position}
                      </h2>
                      <p className="mt-2 text-sm font-bold text-violet">
                        {job.location}
                      </p>
                    </div>
                    <a
                      href={job.applyLink}
                      className="mt-12 block w-full  rounded-md bg-violet py-4 text-center text-base font-bold text-white hover:bg-light-violet md:ml-auto  md:mt-0 md:w-36"
                      type="button"
                    >
                      Apply Now
                    </a>
                  </div>
                  <JobDescription description={job.description} />
                </section>
                {width < 768 ? (
                  <div className="mt-16 flex items-center justify-center bg-white p-6 dark:bg-very-dark-blue">
                    <a
                      className="w-full rounded-md bg-violet py-4 text-center text-base font-bold text-white"
                      href={job.applyLink}
                    >
                      Apply now
                    </a>
                  </div>
                ) : (
                  <div className="mt-16  bg-white  dark:bg-very-dark-blue ">
                    <div className="flex items-center justify-between p-6 md:px-10 md:pt-6 xl:mx-auto xl:max-w-[730px] xl:px-0">
                      <div>
                        <h3 className="text-xl font-bold text-very-dark-blue dark:text-white">
                          {job.position}
                        </h3>
                        <p className="text-base font-normal text-dark-gray">
                          {job.company}
                        </p>
                      </div>
                      <a
                        className="rounded-md bg-violet px-7 py-4 text-center text-base font-bold text-white hover:bg-light-violet md:py-3"
                        href={job.applyLink}
                      >
                        Apply now
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
    </>
  );
};

export default Detail;
