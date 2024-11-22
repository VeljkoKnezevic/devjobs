import { useEffect } from "react";
import { Data, FilterTypes, JobData } from "../Data";
import Job from "./Job";

type JobsProps = {
  data: Data | undefined;
  filters: FilterTypes;
  loadMore: boolean;
  getData: () => void;
};

const Jobs = ({ loadMore, data, filters, getData }: JobsProps) => {
  useEffect(() => {
    getData();
  }, [getData]);

  const filteringFunction = (job: JobData, filter: string | boolean) => {
    if (filter === filters.search) {
      if (!filters.search) return job;

      return job.position.toLowerCase().includes(filters.search);
    }

    if (filter === filters.fullTime) {
      if (!filters.fullTime) return job;

      return job.contract === "Full Time";
    }

    if (!filters.location) return job;

    return job.location.toLowerCase().includes(filters.location.toLowerCase());
  };

  return (
    <div className="mt-[57px] grid gap-12 md:mx-10 md:grid-cols-2 md:gap-x-3 md:gap-y-16 xl:mx-40 xl:mt-20 xl:grid-cols-3 xl:gap-x-8 xl:gap-y-10">
      {!loadMore && data
        ? data
            .slice(0, 12)
            .filter((job) => filteringFunction(job, filters.search))
            .filter((job) => filteringFunction(job, filters.fullTime))
            .filter((job) => filteringFunction(job, filters.location))
            .map((job) => {
              return <Job key={job.id} job={job} />;
            })
        : data &&
          data
            .filter((job) => filteringFunction(job, filters.search))
            .filter((job) => filteringFunction(job, filters.fullTime))
            .filter((job) => filteringFunction(job, filters.location))
            .map((job) => {
              return <Job key={job.id} job={job} />;
            })}
    </div>
  );
};

export default Jobs;
