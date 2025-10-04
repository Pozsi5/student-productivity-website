import React, { useState } from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

const TopBar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);

    return (
        <>
            <header className="w-full h-16 bg-blue-100 shadow flex items-center justify-between px-4 relative">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-300 rounded-full"/>
                    <HamburgerMenu open={menuOpen} setOpen={setMenuOpen} />

                    {menuOpen && (
                        <div
                            className="absolute top-full left-0 mt-2 w-48 rounded-lg shadow-xl z-20 bg-blue-300 rounded-lg"
                        >
                            <ul className="p-4 text-black">
                                <li className="py-2 px-4 hover:bg-blue-500 rounded">
                                    <Link to="/" onClick={() => setMenuOpen(false)}>Pomodoro</Link>
                                </li>
                                <li className="py-2 px-4 hover:bg-blue-500 rounded">Task List</li>
                                <li className="py-2 px-4 hover:bg-blue-500 rounded">Eisenhower</li>
                                <li className="py-2 px-4 hover:bg-blue-500 rounded">Calendar</li>
                                <li className="py-2 px-4 hover:bg-blue-500 rounded">Stay Focused</li>
                                <li className="py-2 px-4 hover:bg-blue-500 rounded">
                                    <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
                                </li>
                                <li className="py-2 px-4 hover:bg-blue-500 rounded">Help</li>
                                <li className="py-2 px-4 hover:bg-blue-500 rounded">Settings</li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <button
                        className="w-8 h-8 bg-blue-200 hover:bg-blue-400 rounded-full text-white font-bold flex items-center justify-center"
                        onClick={() => setInfoOpen(true)}
                    >
                        i
                    </button>
                    <div className="w-8 h-8 bg-gray-400 rounded-full"/>
                </div>
            </header>

            {infoOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-xl w-80 text-center">
                        <h2 className="text-lg font-semibold text-blue-700 mb-4">What is the Pomodoro Technique</h2>
                        <p className="text-gray-700 mb-6">
                            The Pomodoro technique is a time management method. It has three different states: first the Pomodoro, when you are working on the task, and then a short break. After a few of these, there is a big break.
                            This method helps you stay focused in the long term.
                        </p>
                        <button
                            onClick={() => setInfoOpen(false)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Thank you!
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default TopBar;