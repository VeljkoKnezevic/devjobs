import { useEffect } from "react";
import { Data, FilterTypes, JobData } from "../Data";
import Job from "./Job";

type JobsProps = {
  data: Data | undefined;
  filters: FilterTypes;
  getData: () => void;
};

const Jobs = ({ data, filters, getData }: JobsProps) => {
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
    <div className="mt-[57px] grid gap-12">
      {data &&
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
