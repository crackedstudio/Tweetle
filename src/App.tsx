import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./pages/MainLayout";
import Friends from "./pages/Friends";
import Leaderboard from "./pages/Leaderboard";
import Play from "./pages/Play";
import ClassicPlay from "./pages/ClassicPlay";
import ErrorBoundary from "./components/ErrorBoundary";
import RouteError from "./components/RouteError"; // Create this component

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={<MainLayout />}
                        errorElement={<RouteError />}
                    >
                        <Route
                            index
                            element={<Home />}
                            errorElement={<RouteError />}
                        />
                        <Route
                            path="friends"
                            element={<Friends />}
                            errorElement={<RouteError />}
                        />
                        <Route
                            path="leaderboard"
                            element={<Leaderboard />}
                            errorElement={<RouteError />}
                        />
                        <Route
                            path="play"
                            element={<Play />}
                            errorElement={<RouteError />}
                        />
                        <Route
                            path="classic"
                            element={<ClassicPlay />}
                            errorElement={<RouteError />}
                        />
                        {/* Catch all route for 404s */}
                        <Route path="*" element={<RouteError />} />
                    </Route>
                </Routes>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
