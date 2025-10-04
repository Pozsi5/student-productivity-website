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
        </div>
    );
};

export default HamburgerMenu;
