import { useContext, useEffect, useState } from "react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

import { AuthContext } from "../provider/AuthProvider"; 
import { NavLink, useNavigate } from "react-router";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="w-11/12 mx-auto flex justify-between items-center py-3">
        <div className="text-xl font-bold text-gray-800 dark:text-white">
          HobbyHub
        </div>

        <nav className="hidden md:flex gap-6 text-gray-600 dark:text-gray-200 font-medium">
          <NavLink
            to="/all-hobby"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "hover:text-blue-600 transition"
            }
          >
            All Hobby
          </NavLink>
          <NavLink
            to="/my-hobby"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "hover:text-blue-600 transition"
            }
          >
            My Hobby
          </NavLink>
          <NavLink
            to="/create-hobby"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "hover:text-blue-600 transition"
            }
          >
            Create Hobby
          </NavLink>
          <NavLink
            to="/currency-converter"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "hover:text-blue-600 transition"
            }
          >
            Currency Converter
          </NavLink>
          <NavLink
            to="/chat-me"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "hover:text-blue-600 transition"
            }
          >
            Chat Me
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
        
          <button
            onClick={toggleTheme}
            className="text-xl text-gray-700 dark:text-gray-200 hover:text-yellow-500 transition"
            title="Toggle Theme"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>

      
          {user ? (
            <>
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full border"
                  title={user.displayName || user.email}
                />
              )}
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
              >
                Register
              </NavLink>
            </>
          )}

 
          <button
            onClick={toggleMenu}
            className="md:hidden text-xl text-gray-700 dark:text-gray-200"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>


      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-6 pb-4 space-y-3">
          <NavLink to="/all-hobby" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600 transition">
            All Hobby
          </NavLink>
          <NavLink to="/my-hobby" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600 transition">
            My Hobby
          </NavLink>
          <NavLink to="/create-hobby" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600 transition">
            Create Hobby
          </NavLink>
          {!user ? (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">
                Login
              </NavLink>
              <NavLink to="/register" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">
                Register
              </NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className="block text-left hover:text-red-500">
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
