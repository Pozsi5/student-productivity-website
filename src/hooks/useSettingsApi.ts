import { useState, useEffect } from 'react';
import { PomodoroSettings } from '../types/PomodoroSettings';
import { getOrCreateClientId } from '../utils/UseClientId';

const DEFAULT_SETTINGS: PomodoroSettings = {
    workDurationMin: 25,
    shortBreakDurationMin: 5,
    longBreakDurationMin: 15,
    loops: 4,
};

const API_BASE_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:8080/api'}/pomodoro/settings`;

export const useSettingsApi = () => {
    const [settings, setSettings] = useState<PomodoroSettings>(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(true);

    const saveSettings = (settingsToSave: PomodoroSettings) => {
        const clientId = getOrCreateClientId();

        const payload = JSON.stringify(settingsToSave);

        fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'X-Client-ID': clientId, // Kritikus az autentikációhoz
                'Content-Type': 'application/json',
            },
            body: payload,
        })
            .then(response => {
                if (!response.ok) {
                    console.error('Hiba a beállítások mentésekor. Státusz:', response.status);
                    // Lehet, hogy itt egy hibát jelezni kellene a felhasználó felé
                } else {
                    console.log('Beállítások sikeresen mentve a backendre.');
                }
            })
            .catch(err => {
                console.error('Hálózati hiba a mentés során. Backend fut?', err);
            });
    };

    useEffect(() => {
        const fetchSettings = async () => {
            const clientId = getOrCreateClientId();

            try {
                const response = await fetch(API_BASE_URL, {
                    method: 'GET',
                    headers: {
                        'X-Client-ID': clientId,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.error(`Szerver hiba (${response.status}) a beállítások betöltésekor.`);
                    setSettings(DEFAULT_SETTINGS);
                    setLoading(false);
                    return;
                }
                const data: PomodoroSettings = await response.json();

                setSettings(data);
            } catch (error) {
                console.error("Nem sikerült lekérni a beállításokat, default értékek használata.", error);
                setSettings(DEFAULT_SETTINGS);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const updateSetting = (key: keyof PomodoroSettings, delta: 1 | -1) => {
        setSettings(prevSettings => {
            const newValue = Math.max(1, prevSettings[key] + delta);
            const newSettings = {
                ...prevSettings,
                [key]: newValue
            };

            saveSettings(newSettings);

            return newSettings;
        });
    };

    return { settings, loading, saveSettings, updateSetting };
};