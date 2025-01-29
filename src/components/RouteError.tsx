// src/components/RouteError.tsx
import { useRouteError, useNavigate } from "react-router-dom";

const RouteError = () => {
    const error = useRouteError() as any;
    const navigate = useNavigate();

    const errorMessage =
        error?.statusText || error?.message || "Something went wrong";
    const is404 = error?.status === 404;

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-4xl font-bold mb-4">
                {is404 ? "Page Not Found" : "Oops! Something went wrong"}
            </h1>
            <p className="text-gray-400 mb-8">
                {is404
                    ? `The page you're looking for doesn't exist.`
                    : errorMessage}
            </p>
            <div className="space-x-4">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                    onClick={() => navigate("/")}
                >
                    Go to Home
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default RouteError;
