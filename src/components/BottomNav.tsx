import { Link, useLocation } from "react-router-dom";
import HomeIcon from "./HomeIcon";
import FriendsIcon from "./FriendsIcon";
import LeaderboardIcon from "./LeaderboardIcon";

const BottomNav = () => {
    const location = useLocation();

    const navItems = [
        { path: "/", icon: HomeIcon, label: "Home" },
        { path: "/leaderboard", icon: LeaderboardIcon, label: "Leaderboard" },
        { path: "/friends", icon: FriendsIcon, label: "Friends" },
    ];

    return (
        <nav className="absolute w-full bottom-0 left-0 right-0 bg-black py-3 z-[20]">
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
                        {
                            <item.icon
                                color={
                                    location.pathname === item.path
                                        ? "#FE97D5"
                                        : "#787A80"
                                }
                            />
                        }
                        <span className="text-xs mt-2">{item.label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default BottomNav;
