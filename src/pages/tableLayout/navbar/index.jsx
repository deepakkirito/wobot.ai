import { useEffect, useState } from "react";
import Search from "../../../assets/images/svg/search.svg";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    search === "" && setSearchTerm("");
  }, [search]);

  return (
    <div className="navbar w-full h-16 flex items-center justify-between flex-wrap gap-4">
      <div>
        <p className="text-xl">Cameras</p>
        <p className="text-sm text-gray-500">Manage your cameras here.</p>
      </div>
      <div className="flex items-center bg-[#F3F3F4] pr-2 rounded-md xs:pb-8">
        <input
          type="search"
          placeholder="Search"
          className="px-4 py-2 bg-[#F3F3F4] rounded-md text-sm focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && setSearchTerm(search)}
        />
        <button
          className="bg-[#F3F3F4]"
          onClick={() => setSearchTerm(search)}
          title="Click to Search"
        >
          <img src={Search} alt="Search" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
