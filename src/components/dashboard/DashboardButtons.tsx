import { ReactElement } from "react";
import { Link } from "react-router-dom";

interface DashboardButtonsProps {
    children: ReactElement;
    where: string;
}
const DashboardButtons = ({ children, where }: DashboardButtonsProps) => {
    return (
        <Link to={where}>
            <div className="w-full bg-[#4F5285] text-white rounded-xl px-3 py-6 text-[20px] font-extrabold my-4">
                {children}
            </div>
        </Link>
    );
};

export default DashboardButtons;
