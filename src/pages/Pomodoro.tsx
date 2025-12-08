import React, { useState, useEffect } from "react";
import TimerImage from "../components/TimerImage";
import TimeSelector from "../components/TimeSelector";
import StartButton from "../components/StartButton";

import { getOrCreateClientId } from "../utils/UseClientId";
import { PomodoroSettings } from "../types/PomodoroSettings";

const API_BASE_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:8080/api'}/pomodoro/settings`;

const Pomodoro: React.FC = () => {
    const DEFAULT_SETTINGS: PomodoroSettings = {
        workDurationMin: 25,
        shortBreakDurationMin: 5,
        longBreakDurationMin: 15,
        loops: 4
    };
    const [pomodoroSettings, setPomodoroSettings] = useState<PomodoroSettings>(DEFAULT_SETTINGS)

    const saveSettings = (settingsToSave: PomodoroSettings) => {
        const clientId = getOrCreateClientId();
        const API_URL = 'http://localhost:8080/api/pomodoro/settings';

        const payload = JSON.stringify(settingsToSave);

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'X-Client-ID': clientId,
                'Content-Type': 'application/json',
            },
            body: payload,
        })
            .then(response => {
                if (!response.ok) {
                    console.error('Hiba a beállítások mentésekor. Státusz:', response.status);
                } else {
                    console.log('Beállítások sikeresen mentve a backendre.');
                }
            })
            .catch(err => {
                console.error('Hálózati hiba a mentés során. Backend fut?', err);
            });
    };

    const updateSetting = (key: keyof PomodoroSettings, delta: 1 | -1) => {
        setPomodoroSettings(prevSettings => {
            const newValue = Math.max(1, prevSettings[key] + delta);
            const newSettings = {
                ...prevSettings,
                [key]: newValue
            };
            saveSettings(newSettings);

            return newSettings;
        });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const clientId = getOrCreateClientId();

        fetch(API_BASE_URL, {
            method: 'GET',
            headers: {
                'X-Client-ID': clientId,
                'Content-Type': 'application/json',
            },
        }).then(response => {
                if (!response.ok) {
                    console.error(`Szerver hiba (${response.status}) a beállítások betöltésekor.`);
                    throw new Error("Szerver hiba!");
                }
                return response.json();
            }).then((data: PomodoroSettings) => {
                setPomodoroSettings(data);
                console.log("Beállítások betöltve:", data);
            }).catch(error => {
                console.error("Nem sikerült lekérni a beállításokat, default értékek használata.", error);
                setPomodoroSettings(DEFAULT_SETTINGS);
            });
    }, []); //Üres tömb miatt csak egyszer tölt be.

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
            <TimerImage />
            <div className="grid grid-cols-2 gap-6">
                <TimeSelector
                    title="Pomodoro"
                    label="Time for focused work"
                    value={pomodoroSettings.workDurationMin}
                    onIncrease={() => updateSetting('workDurationMin', 1)}
                    onDecrease={() => updateSetting('workDurationMin', -1)}
                />
                <TimeSelector
                    title="Short Break"
                    label="Break between sessions"
                    value={pomodoroSettings.shortBreakDurationMin}
                    onIncrease={() => updateSetting('shortBreakDurationMin', 1)}
                    onDecrease={() => updateSetting('shortBreakDurationMin', -1)}
                />
                <TimeSelector
                    title="Long Break"
                    label="Break after a full cycle"
                    value={pomodoroSettings.longBreakDurationMin}
                    onIncrease={() => updateSetting('longBreakDurationMin', 1)}
                    onDecrease={() => updateSetting('longBreakDurationMin', -1)}
                />
                <TimeSelector
                    title="Loops"
                    label="Sessions per cycle"
                    value={pomodoroSettings.loops}
                    onIncrease={() => updateSetting('loops', 1)}
                    onDecrease={() => updateSetting('loops', -1)}
                />
            </div>
            <StartButton />
        </div>
    )
};

export default Pomodoro;
