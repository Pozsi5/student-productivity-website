import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pomodoro from "../pages/Pomodoro";
import About from "../pages/About";
import Layout from "../components/Layout";

const AppRouter = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Layout><Pomodoro /></Layout>} />
                    <Route path="/about" element={<Layout><About /></Layout>} />
                </Routes>
        </Router>
    );
};

export default AppRouter;
