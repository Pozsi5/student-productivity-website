import React from 'react';

interface HamburgerMenuProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ open, setOpen }) => {
    return (
        <div className="relative">
            <button
                className="text-white focus:outline-none"
                onClick={() => setOpen(!open)}
            >
                <div className={`w-6 h-0.5 bg-white mb-1 transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white mb-1 transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`}></div>
                <div className={`w-6 h-0.5 bg-white mt-1 transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>

            {/*<div
                className={`absolute left-0 mt-2 w-48 bg-blue-300 text-white rounded-lg shadow-lg transform transition-all z-50 ${
                    open ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <ul className="p-4">
                    <li className="py-2 px-4 hover:bg-blue-700">Home</li>
                    <li className="py-2 px-4 hover:bg-blue-700">About</li>
                    <li className="py-2 px-4 hover:bg-blue-700">Contact</li>
                </ul>
            </div>*/}
        </div>
    );
};

export default HamburgerMenu;
