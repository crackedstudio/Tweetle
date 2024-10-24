import { useState } from "react";
import LoadingFullPage from "../components/pages/LoadingFullPage";
import Dashboard from "../components/pages/Dashboard";

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            {isLoading && <LoadingFullPage />}
            {!isLoading && <Dashboard />}
        </>
    );
};

export default Home;
