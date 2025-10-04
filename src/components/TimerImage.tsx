import React from 'react';
import OrangeClock from "../assets/OrangeClock.png";

const TimerImage: React.FC = () => (
    <div className="my-8">
        <img src={OrangeClock} alt="Pomodoro Clock" className="w-64 h-64 mx-auto" />
    </div>
);

export default TimerImage;