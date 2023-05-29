import { useParams } from "react-router-dom";
import { SetStateAction, useEffect } from "react";
import { Data } from "../Data";
import Header from "./Header";
import Main from "./Main";

type DetailProps = {
  data: Data | undefined;
  dark: boolean;
  setDark: React.Dispatch<SetStateAction<boolean>>;
  getData: () => void;
};

const Detail = ({ data, dark, setDark, getData }: DetailProps) => {
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
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
                <Header dark={dark} setDark={setDark} />
                <section className="relative mx-6 -mt-4 flex flex-col items-center rounded-md bg-white pb-8 pt-12  dark:bg-very-dark-blue">
                  <div
                    style={{
                      background: job.logoBackground,
                    }}
                    className="absolute -top-6 flex h-[50px] w-[50px] items-center justify-center rounded-2xl"
                  >
                    <img src={job.logo} alt={job.company} />
                  </div>
                  <h2 className="text-xl font-bold text-very-dark-blue dark:text-white">
                    {job.company}
                  </h2>
                  <a
                    className="mt-2 text-base font-normal text-dark-gray"
                    href={job.website}
                  >
                    {`${job.website.replace("https://example.com/", "")}.com`}
                  </a>
                  <a
                    className="font-base mt-6 rounded-md bg-violet bg-opacity-10 px-5 py-4 font-bold text-violet"
                    href={job.website}
                  >
                    Company Site
                  </a>
                </section>
                <section className="mx-6 mt-6 bg-white px-6 py-10 dark:bg-very-dark-blue">
                  <div className="flex items-end gap-3">
                    <p className="text-base font-normal text-dark-gray">
                      {job.postedAt}
                    </p>
                    <div className="mb-[6px] h-1 w-1 rounded-full bg-dark-gray"></div>
                    <p className="text-base font-normal text-dark-gray">
                      {job.contract}
                    </p>
                  </div>
                  <h2 className="mt-1 text-xl font-bold text-very-dark-blue dark:text-white">
                    {job.position}
                  </h2>

                  <p className="mt-2 text-sm font-bold text-violet">
                    {job.location}
                  </p>
                  <a
                    href={job.apply}
                    className="mt-[50px] w-full rounded-md bg-violet py-4 text-center text-base  font-bold text-white"
                    type="button"
                  >
                    Apply Now
                  </a>
                  <p className="mt-8 text-base font-normal text-dark-gray">
                    {job.description}
                  </p>
                  <h3 className="mt-8 text-xl font-bold text-very-dark-blue dark:text-white">
                    Requirements
                  </h3>
                  <p className="mt-7 text-base font-normal text-dark-gray">
                    {job.requirements.content}
                  </p>
                  <ul className="mt-8 flex list-disc flex-col gap-2 pl-5">
                    {job.requirements.items.map((item) => {
                      return (
                        <li className="pl-4 text-violet" key={item}>
                          <div className="text-normal text-base text-dark-gray">
                            {item}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <h3 className="mt-10 text-xl font-bold text-very-dark-blue dark:text-white">
                    What You Will Do
                  </h3>
                  <p className="mt-7 text-base font-normal text-dark-gray">
                    {job.role.content}
                  </p>
                  <ol className="mt-8 flex list-decimal flex-col gap-2 pl-3 ">
                    {job.role.items.map((item) => {
                      return (
                        <li className="pl-7 text-violet" key={item}>
                          <div className="text-base font-normal text-dark-gray">
                            {item}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </section>
                <div className="mt-16 flex items-center justify-center bg-white p-6 dark:bg-very-dark-blue">
                  <a
                    className="w-full rounded-md bg-violet py-4 text-center text-base font-bold text-white"
                    href={job.apply}
                  >
                    Apply now
                  </a>
                </div>
              </div>
            );
          })}
    </>
  );
};

export default Detail;
