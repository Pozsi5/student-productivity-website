import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import HamburgerMenu from "./HamburgerMenu";

const TopBar: React.FC = () => {
    const auth = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false); // Új állapot a profil menünek

    const profile = auth.user?.profile;
    const name = profile?.given_name || profile?.preferred_username || "Diák";
    const picture = profile?.picture; // A Google profilkép URL-je (ha van)

    const handleLogout = () => {
        void auth.signoutRedirect({
            post_logout_redirect_uri: `${window.location.origin}?logout=success`
        });
    };

    return (
        <>
            <header className="w-full h-16 bg-[#4A90E2] shadow-md flex items-center justify-between px-6 relative z-30">

                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 font-bold text-blue-600 bg-white rounded-xl shadow-sm">
                        SP
                    </div>

                    <div className="text-white">
                        <HamburgerMenu open={menuOpen} setOpen={setMenuOpen} />
                    </div>

                    {menuOpen && (
                        <div className="absolute left-6 top-16 mt-2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                            <ul className="text-gray-700">
                                <li className="hover:bg-blue-50 transition-colors">
                                    <Link to="/" className="block px-6 py-3 font-medium" onClick={() => setMenuOpen(false)}>Pomodoro</Link>
                                </li>
                                <li className="px-6 py-3 font-medium cursor-pointer hover:bg-blue-50 transition-colors">Task List</li>
                                <li className="px-6 py-3 font-medium cursor-pointer hover:bg-blue-50 transition-colors">Eisenhower</li>
                                <li className="px-6 py-3 font-medium cursor-pointer hover:bg-blue-50 transition-colors">Calendar</li>
                                <li className="px-6 py-3 font-medium cursor-pointer hover:bg-blue-50 transition-colors">Stay Focused</li>
                                <li className="border-t border-gray-100 hover:bg-blue-50 transition-colors">
                                    <Link to="/about" className="block px-6 py-3 font-medium" onClick={() => setMenuOpen(false)}>About Us</Link>
                                </li>
                                <li className="px-6 py-3 font-medium cursor-pointer hover:bg-blue-50 transition-colors">Help</li>
                                <li className="px-6 py-3 font-medium cursor-pointer hover:bg-blue-50 transition-colors">Settings</li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Info és Profil */}
                <div className="flex items-center gap-5 relative">
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white font-bold hover:bg-white/30 transition-all focus:outline-none"
                        onClick={() => setInfoOpen(true)}
                        title="Információ"
                    >
                        ?
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-2 focus:outline-none"
                        >
                            <span className="text-white font-medium hidden sm:block">Szia, {name}!</span>
                            {picture ? (
                                <img
                                    src={picture}
                                    alt="Profil"
                                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="w-10 h-10 flex items-center justify-center bg-blue-700 text-white font-bold rounded-full border-2 border-white shadow-sm">
                                    {name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </button>

                        {/* Profil legördülő menü */}
                        {profileOpen && (
                            <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                                    <p className="text-sm font-medium text-gray-900 truncate">{profile?.email}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 text-sm text-red-600 font-bold hover:bg-red-50 transition-colors"
                                >
                                    Kijelentkezés
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {infoOpen && (
                <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50 transition-all">
                    <div className="bg-white rounded-2xl p-8 shadow-2xl w-96 text-center transform scale-100">
                        <h2 className="text-2xl font-extrabold text-[#4A90E2] mb-4">A Pomodoro Technika</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            A Pomodoro technika egy kiváló időgazdálkodási módszer. Három fázisból áll: először a <strong>Pomodoro</strong> (amikor mélyen fókuszálsz a feladatra), majd egy rövid szünet. Pár ciklus után pedig egy hosszabb pihenő következik. Ez a ritmus segít a hosszú távú koncentráció fenntartásában.
                        </p>
                        <button
                            onClick={() => setInfoOpen(false)}
                            className="w-full px-6 py-3 font-bold text-white transition-colors bg-[#4A90E2] rounded-xl hover:bg-blue-600"
                        >
                            Értem, köszönöm!
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default TopBar;