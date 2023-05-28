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
    <div className="h-full w-full bg-light-gray pb-16 font-kumbh dark:bg-midnight">
      {data &&
        data
          .filter((job) => job.id.toString() === id)
          .map((job) => {
            return (
              <div key={job.id}>
                <Header dark={dark} setDark={setDark} />
                <section className="mx-6 rounded-md bg-white">
                  <div
                    style={{
                      background: job.logoBackground,
                    }}
                    className="flex h-[50px] w-[50px] items-center justify-center rounded-2xl"
                  >
                    <img src={job.logo} alt={job.company} />
                  </div>
                  <h2>{job.company}</h2>
                  <a href={job.website}>{job.website}</a>
                </section>
              </div>
            );
          })}
    </div>
  );
};

export default Detail;
