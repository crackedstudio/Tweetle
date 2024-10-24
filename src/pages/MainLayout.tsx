import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen text-white">
            <main className="flex-grow pb-16">
                <Outlet />
            </main>
            <BottomNav />
        </div>
    );
};

export default MainLayout;
