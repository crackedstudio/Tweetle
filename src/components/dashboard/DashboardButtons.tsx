import { ReactElement } from "react";
import { Link } from "react-router-dom";

interface DashboardButtonsProps {
    children: ReactElement;
    where: string;
    hasPair?: boolean;
}
const DashboardButtons = ({
    children,
    where,
    hasPair,
}: DashboardButtonsProps) => {
    return (
        <Link to={where}>
            <div
                className={
                    hasPair
                        ? `w-full relative bg-button-image text-white rounded-l-lg px-3 py-6 text-[20px] font-extrabold my-4 bg-cover bg-center border border-1`
                        : `w-full relative bg-button-image text-white rounded-lg px-3 py-6 text-[20px] font-extrabold my-4 bg-cover bg-center border border-1`
                }
            >
                {/* Black opaque mask */}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

                {/* Children */}
                <div className="relative z-10">{children}</div>
            </div>
        </Link>
    );
};

export default DashboardButtons;
