import { SetStateAction, useCallback, useEffect, useState } from "react";
import { Data, FilterTypes } from "../Data";
import Job from "./Job";

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

  return (
    <div className="mt-[57px] grid gap-12">
      {data &&
        data.map((job) => {
          return <Job key={job.id} job={job} />;
        })}
    </div>
  );
};

export default Jobs;
