import { useState, useEffect } from 'react';
import { PomodoroSettings } from '../types/PomodoroSettings';
import useAxios from '../hooks/useAxios'; // <-- Beimportáljuk az új hookot

const DEFAULT_SETTINGS: PomodoroSettings = {
    workDurationMin: 25,
    shortBreakDurationMin: 5,
    longBreakDurationMin: 15,
    loops: 4,
};

export const useSettingsApi = () => {
    const [settings, setSettings] = useState<PomodoroSettings>(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(true);

    // Itt hívjuk meg az okos Axiost, ami már tudja a tokent kezelni!
    const api = useAxios();

    const saveSettings = async (settingsToSave: PomodoroSettings) => {
        try {
            // Nem kell JSON.stringify, sem header beállítás, az Axios mindezt megoldja!
            await api.post('/pomodoro/settings', settingsToSave);
            console.log('Beállítások sikeresen mentve a backendre.');
        } catch (err) {
            console.error('Hálózati hiba a mentés során. Backend fut?', err);
        }
    };

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                // A válasz adatait automatikusan JSON-ként kapjuk meg a .data alatt
                const response = await api.get<PomodoroSettings>('/pomodoro/settings');
                setSettings(response.data);
            } catch (error) {
                console.error("Nem sikerült lekérni a beállításokat, default értékek használata.", error);
                setSettings(DEFAULT_SETTINGS);
            } finally {
                setLoading(false);
            }
        };

        void fetchSettings();
    }, [api]);

    const updateSetting = (key: keyof PomodoroSettings, delta: 1 | -1) => {
        setSettings(prevSettings => {
            const newValue = Math.max(1, prevSettings[key] + delta);
            const newSettings = {
                ...prevSettings,
                [key]: newValue
            };

            void saveSettings(newSettings);
            return newSettings;
        });
    };

    return { settings, loading, saveSettings, updateSetting };
};
