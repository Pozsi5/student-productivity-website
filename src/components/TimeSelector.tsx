import React from 'react';

interface TimeSelectorProps {
    title: string;
    label: string;
    value: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
                                                       title,
                                                       label,
                                                       value,
                                                       onIncrease,
                                                       onDecrease,
                                                   }) => {
    return (
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow w-40">
            <h3 className="text-blue-800 font-semibold mb-2">{title}</h3>
            <div className="flex items-center gap-2">
                <button onClick={onDecrease} className="text-xl bg-blue-200 rounded-full w-8 h-8">▼</button>
                <span className="text-2xl font-bold w-10 text-center">{value}</span>
                <button onClick={onIncrease} className="text-xl bg-blue-200 rounded-full w-8 h-8">▲</button>
            </div>
            <span className="text-sm text-gray-600 mt-2">{label}</span>
        </div>
    );
};

export default TimeSelector;