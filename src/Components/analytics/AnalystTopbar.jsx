import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, Users, Gamepad2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { motion } from "motion/react"
export default function AnalystTopbar() {
  const { setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/analyst/dashboard", icon: LayoutDashboard },
    { name: "Users", path: "/analyst/users", icon: Users },
    { name: "Games", path: "/analyst/games", icon: Gamepad2 },
    { name: "Leaderboard", path: "/analyst/leaderboard", icon: Gamepad2 },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login");
  };

  return (
        <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
         <Link to="/analyst/dashboard" className="text-lg font-bold">Analyst Panel</Link>
        <button onClick={() => {
            setOpen(true)
        }}>
          <Menu />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: open ? 1 : 0 }}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div 
        initail={{x:-250}}
        animate={{ x: 0}}
        transition={{ duration: 0.3}}
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static 
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold">Analyst Panel</h2>
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-2 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 p-2 rounded transition
                  ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}
                `}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 w-full px-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full p-2 rounded bg-red-500 hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </motion.div>
    </>
  );
}