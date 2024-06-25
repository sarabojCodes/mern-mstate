import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl p-3 mx-auto">
       <Link to={"/"}>
       <h1 className="font-medium text-sm flex sm:text-xl flex-wrap">
          <span className="text-green-400">SS</span>
          <span className="text-gray-600">Estate</span>
        </h1>
       </Link>
        <form className="bg-slate-100 flex items-center gap-3 p-3 rounded-lg">
          <input
            type="search"
            placeholder="Search...."
            className="bg-transparent  focus:outline-none w-24 sm:w-64   "
          />
          <FaSearch className="text-slate-600 text-lg" />
        </form>
        <ul className="flex gap-4 items-center">
          <Link to={"/"}>
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
          <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
            About
          </li>
          </Link>
          <Link to={"sign-in"}>
          <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
            Sign in
          </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
