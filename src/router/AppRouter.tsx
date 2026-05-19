import { Routes, Route } from "react-router-dom";
import Pomodoro from "../pages/Pomodoro";
import About from "../pages/About";
import Layout from "../components/Layout";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout><Pomodoro /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
        </Routes>
    );
};

export default AppRouter;