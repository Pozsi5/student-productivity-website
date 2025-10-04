import React, { useState } from "react";
import TimerImage from "../components/TimerImage";
import TimeSelector from "../components/TimeSelector";
import StartButton from "../components/StartButton";

const Pomodoro: React.FC = () => {
    const [pomodoro, setPomodoro] = useState<number>(25);
    const [shortBreak, setShortBreak] = useState<number>(5);
    const [longBreak, setLongBreak] = useState<number>(15);
    const [loops, setLoops] = useState<number>(4);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
            <TimerImage />
            <div className="grid grid-cols-2 gap-6">
                <TimeSelector
                    title="Pomodoro"
                    label="Time for focused work"
                    value={pomodoro}
                    onIncrease={() => setPomodoro(p => p + 1)}
                    onDecrease={() => setPomodoro(p => Math.max(1, p-1))}
                />
                <TimeSelector
                    title="Short Break"
                    label="Break between sessions"
                    value={shortBreak}
                    onIncrease={() => setShortBreak(p => p + 1)}
                    onDecrease={() => setShortBreak(p => Math.max(1, p-1))}
                />
                <TimeSelector
                    title="Long Break"
                    label="Break after a full cycle"
                    value={longBreak}
                    onIncrease={() => setLongBreak(p => p + 1)}
                    onDecrease={() => setLongBreak(p => Math.max(1, p-1))}
                />
                <TimeSelector
                    title="Loops"
                    label="Sessions per cycle"
                    value={loops}
                    onIncrease={() => setLoops(p => p + 1)}
                    onDecrease={() => setLoops(p => Math.max(1, p-1))}
                />
            </div>
            <StartButton />
            {/*<h1 className="text-4xl font-bold">Pomodoro 🍅</h1>*/}
        </div>
    )
};

export default Pomodoro;
