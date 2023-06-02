import { Link } from "react-router-dom";
import { JobData } from "../Data";

type JobProps = {
  job: JobData;
};

const Job = ({ job }: JobProps) => {
  return (
    <div
      key={job.id}
      className="relative mx-6 rounded-md bg-white dark:bg-very-dark-blue md:mx-0"
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
          <p className="text-base font-normal text-dark-gray">{job.postedAt}</p>
          <div className="mb-[6px] h-1 w-1 rounded-full bg-dark-gray"></div>
          <p className="text-base font-normal text-dark-gray">{job.contract}</p>
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
        <p className="mt-11 text-sm font-bold text-violet">{job.location}</p>
      </div>
    </div>
  );
};

export default Job;
