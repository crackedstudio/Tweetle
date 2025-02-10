import { Link, useLocation } from "react-router-dom";
import { ChartNoAxesColumn, House, Users } from "lucide-react";

const BottomNav = () => {
    const location = useLocation();

    const navItems = [
        { path: "/", icon: <House size={16} />, label: "Home" },
        {
            path: "/leaderboard",
            icon: <ChartNoAxesColumn size={16} />,
            label: "Leaderboard",
        },
        { path: "/friends", icon: <Users size={16} />, label: "Friends" },
    ];

    return (
        <nav className="fixed w-full bottom-0 border-t-[0.3px] border-t-[#17181D] left-0 right-0 bg-black py-4 z-[20]">
            <div className="flex justify-around">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex flex-col items-center ${
                            location.pathname === item.path
                                ? "text-[#FE97D5]"
                                : "text-gray-500"
                        }`}
                    >
                        {item.icon}
                        <span className="text-xs mt-1">{item.label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default BottomNav;
