import React from 'react';

interface StartButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    isStarted: boolean;
}

const StartButton: React.FC<StartButtonProps> = ({ children, onClick, isStarted }) => {

    const buttonClasses = `mt-8 text-white font-bold py-2 px-6 rounded-full text-lg ${
        isStarted
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
    }`;

    return (
        <button className={buttonClasses} onClick={onClick}>
            {children}
        </button>
    );
};

export default StartButton;