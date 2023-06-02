import { SetStateAction, useEffect } from "react";
import { Data, FilterTypes } from "../Data";
import Job from "./Job";
import { JobData } from "../Data";

type JobsProps = {
  data: Data | undefined;
  setData: React.Dispatch<SetStateAction<Data | undefined>>;
  filters: FilterTypes;
  getData: () => void;
};

const Jobs = ({ data, setData, filters, getData }: JobsProps) => {
  useEffect(() => {
    getData();
  }, [getData]);

  const searchFilter = (job: JobData) => {
    if (!filters.search) {
      return job;
    }
    return job.position.toLowerCase().includes(filters.search);
  };

  const fullTimeFilter = (job: JobData) => {
    if (!filters.fullTime) {
      return job;
    }

    return job.contract === "Full Time";
  };

  const locationFilter = (job: JobData) => {
    if (!filters.location) {
      return job;
    }

    return job.location.toLowerCase().includes(filters.location.toLowerCase());
  };
  return (
    <div className="mt-[57px] grid gap-12">
      {data &&
        data
          .filter((job) => searchFilter(job))
          .filter((job) => fullTimeFilter(job))
          .filter((job) => locationFilter(job))
          .map((job) => {
            return <Job key={job.id} job={job} />;
          })}
    </div>
  );
};

export default Jobs;
