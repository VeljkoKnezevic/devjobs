import { SetStateAction } from "react";

type HeaderProps = {
  setDark: React.Dispatch<SetStateAction<boolean>>;
};

const Header = ({ setDark }: HeaderProps) => {
  const toggleDark = () => {
    setDark((prev) => !prev);
  };
  return (
    <header className="flex justify-between bg-[url(/assets/mobile/bg-pattern-header.svg)] px-6 pb-[72px] pt-8 md:bg-[url(/assets/tablet/bg-pattern-header.svg)] md:px-10 md:pb-[86px] md:pt-10 lg:bg-[url(/assets/desktop/bg-pattern-header.svg)] xl:rounded-bl-[100px] xl:bg-cover xl:px-40 xl:pt-11">
      <h1>
        <img src="/assets/desktop/logo.svg" alt="Devjobs logo" />
      </h1>
      <div className="flex items-center gap-4">
        <img src="/assets/desktop/icon-sun.svg" alt="Light mode" />{" "}
        <label className="flex items-center" htmlFor="toggle">
          <input
            className="relative h-6 w-12 cursor-pointer appearance-none rounded-full bg-white after:absolute after:left-[5px] after:top-[5px] after:z-30 after:h-[14px] after:w-[14px] after:transform after:content-normal after:rounded-full after:bg-violet after:transition after:duration-200 after:checked:translate-x-6 hover:after:bg-light-violet"
            type="checkbox"
            onChange={toggleDark}
            id="toggle"
          />
        </label>
        <img src="/assets/desktop/icon-moon.svg" alt="Dark mode" />
      </div>
    </header>
  );
};

export default Header;
