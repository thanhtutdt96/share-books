import { NavLink } from "react-router-dom";
import logo from "assets/logo.png";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <button className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <NavLink to="/" className="btn btn-ghost normal-case text-lg md:inline-flex hidden">
          <img className="w-6" src={logo} alt="Share books" />
          Share books
        </NavLink>
      </div>
      <div className="navbar-end">
        <div className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
