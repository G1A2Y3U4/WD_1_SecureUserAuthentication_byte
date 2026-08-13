import { NavLink } from "react-router-dom";

function Sidebar() {
    const links = [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/employees", label: "Employees" },
        { to: "/attendance", label: "Attendance" },
        { to: "/leaves", label: "Leave Management" }
    ];

    return (
        <div className="sidebar-panel">
            <div className="brand-pill">Attendance Hub</div>
            {links.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                >
                    {link.label}
                </NavLink>
            ))}
        </div>
    );
}

export default Sidebar;