import AccountButton from "./components/AccountButton.js";
import SearchButton from "./components/SearchButton.js";
import ThemeButton from "./components/ThemeButton.js";

function Header() {
  return (
    <div className="flex justify-end gap-4 p-4">
      <SearchButton />
      <ThemeButton />
      <AccountButton />
    </div>
  );
}

export default Header;
