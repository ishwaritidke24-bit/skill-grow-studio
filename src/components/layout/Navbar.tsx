import { Link, useLocation } from "react-router-dom";
import { Briefcase, User } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Jobs", path: "/jobs" },
  { name: "Resume AI", path: "/resume" },
  { name: "Learn", path: "/courses" },
  { name: "Dashboard", path: "/dashboard" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">
              Careerly
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-pill ${
                    isActive
                      ? "nav-pill-active"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
              <User className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
