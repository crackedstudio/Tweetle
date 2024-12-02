import { Link, useLocation } from "react-router-dom";
import homeIcon from "../assets/home.png";
import leaderboardIcon from "../assets/align-bottom.png";
import friendsIcon from "../assets/user-group.png";

const BottomNav = () => {
    const location = useLocation();

    const navItems = [
        { path: "/", icon: homeIcon, label: "Home" },
        { path: "/leaderboard", icon: leaderboardIcon, label: "Leaderboard" },
        { path: "/friends", icon: friendsIcon, label: "Friends" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-black py-5">
            <div className="flex justify-around">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex flex-col items-center p-2 ${
                            location.pathname === item.path
                                ? "text-[#FE97D5]"
                                : "text-gray-500"
                        }`}
                    >
                        <img src={item.icon} alt={item.label} />
                        <span className="text-xs mt-2">{item.label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default BottomNav;
