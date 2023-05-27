import "react-toggle/style.css";
import Toggle from "react-toggle";
import { SetStateAction } from "react";

type HeaderProps = {
  dark: boolean;
  setDark: React.Dispatch<SetStateAction<boolean>>;
};

const Header = ({ dark, setDark }: HeaderProps) => {
  const toggleDark = () => {
    setDark((prev) => !prev);
  };
  return (
    <header className="flex justify-between bg-[url(/assets/mobile/bg-pattern-header.svg)] px-6 pb-[72px] pt-8">
      <h1>
        <img src="/assets/desktop/logo.svg" alt="Devjobs logo" />
      </h1>
      <div className="flex items-center gap-4">
        <img src="/assets/desktop/icon-sun.svg" alt="Light mode" />
        <Toggle defaultChecked={dark} onChange={toggleDark} icons={false} />
        <img src="/assets/desktop/icon-moon.svg" alt="Dark mode" />
      </div>
    </header>
  );
};

export default Header;
