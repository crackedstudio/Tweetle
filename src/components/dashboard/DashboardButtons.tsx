import { ReactElement } from "react";
import { Link } from "react-router-dom";

interface DashboardButtonsProps {
    children: ReactElement;
    where: string;
}
const DashboardButtons = ({ children, where }: DashboardButtonsProps) => {
    return (
        <Link to={where}>
            <div className="w-full relative bg-button-image text-white rounded-lg px-3 py-4 text-[20px] font-extrabold my-4 bg-cover bg-center border border-1">
                {/* Black opaque mask */}
                <div className="absolute inset-0 bg-black bg-opacity-70 rounded-lg"></div>

                {/* Children */}
                <div className="relative z-10">{children}</div>
            </div>
        </Link>
    );
};

export default DashboardButtons;
