import React, { useCallback } from "react";
import { useSettingsApi } from "../hooks/useSettingsApi";
import { usePomodoroTimer } from "../hooks/usePomodoroTimer";

import TimerImage from "../components/TimerImage";
import TimeSelector from "../components/TimeSelector";
import StartButton from "../components/StartButton";

const Pomodoro: React.FC = () => {
    const { settings, loading, updateSetting } = useSettingsApi();

    const {
        timeLeft,
        isRunning,
        currentPhase,
        handleStartPause,
        handleReset,
        formatTime
    } = usePomodoroTimer(settings);

    const handleStartClick = useCallback(() => {
        handleStartPause();
    }, [handleStartPause]);

    if (loading) {
        return <div className="text-center text-lg mt-10">Beállítások betöltése...</div>;
    }

    const timerDisplay = formatTime(timeLeft);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
            {/* 1. KÉP ÉS IDŐ KIJELZÉS */}
            <TimerImage />
            <h2 className="text-4xl font-bold mt-4 mb-8">
                {currentPhase}: {timerDisplay}
            </h2>
            <p className="mb-4">
                Ciklus: {currentPhase === 'Focus' ? 'Fókusz van' : 'Szünet van'}
            </p>

            {/* 2. IDŐ BEÁLLÍTÓK (TimeSelector Komponens) */}
            <div className="grid grid-cols-2 gap-6">

                {/* POMODORO */}
                <TimeSelector
                    title="Pomodoro"
                    label="Time for focused work"
                    value={settings.workDurationMin}
                    onIncrease={() => updateSetting('workDurationMin', 1)}
                    onDecrease={() => updateSetting('workDurationMin', -1)}
                />

                {/* RÖVID SZÜNET */}
                <TimeSelector
                    title="Short Break"
                    label="Break between sessions"
                    value={settings.shortBreakDurationMin}
                    onIncrease={() => updateSetting('shortBreakDurationMin', 1)}
                    onDecrease={() => updateSetting('shortBreakDurationMin', -1)}
                />

                {/* HOSSZÚ SZÜNET */}
                <TimeSelector
                    title="Long Break"
                    label="Break after a full cycle"
                    value={settings.longBreakDurationMin}
                    onIncrease={() => updateSetting('longBreakDurationMin', 1)}
                    onDecrease={() => updateSetting('longBreakDurationMin', -1)}
                />

                {/* CIKLUSOK SZÁMA */}
                <TimeSelector
                    title="Loops"
                    label="Sessions per cycle"
                    value={settings.loops}
                    onIncrease={() => updateSetting('loops', 1)}
                    onDecrease={() => updateSetting('loops', -1)}
                />
            </div>

            {/* 3. START / SZÜNET / RESET GOMBOK */}
            <div className="mt-8 flex space-x-4">
                <StartButton
                    onClick={handleStartClick}
                    isStarted={isRunning}
                >
                    {isRunning ? 'Szünet' : 'Start'}
                </StartButton>
            </div>
        </div>
    );
};

export default Pomodoro;