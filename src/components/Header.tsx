import "react-toggle/style.css";
import Toggle from "react-toggle";

const Header = () => {
  return (
    <header className="flex justify-between px-6 pt-8 pb-[72px] bg-[url(/assets/mobile/bg-pattern-header.svg)]">
      <h1>
        <img src="/assets/desktop/logo.svg" alt="Devjobs logo" />
      </h1>
      <div className="flex items-center gap-4">
        <img src="/assets/desktop/icon-sun.svg" alt="Light mode" />
        <Toggle icons={false} />
        <img src="/assets/desktop/icon-moon.svg" alt="Dark mode" />
      </div>
    </header>
  );
};

export default Header;
