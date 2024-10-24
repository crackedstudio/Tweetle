import { useEffect, useState } from "react";
import LoadingFullPage from "../components/pages/LoadingFullPage";
import Dashboard from "../components/pages/Dashboard";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 5000);
    
        // Cleanup the timeout if the component unmounts before the timeout is done
        return () => clearTimeout(timer);
      }, []);

    return (
        <>
            {isLoading && <LoadingFullPage />}
            {!isLoading && <Dashboard />}
        </>
    );
};

export default Home;
