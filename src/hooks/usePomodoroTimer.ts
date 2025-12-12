import { useState, useEffect, useCallback, useMemo } from 'react';
import { PomodoroSettings } from '../types/PomodoroSettings';

type Phase = 'Focus' | 'ShortBreak' | 'LongBreak';

// Segédfüggvény: Másodpercek formázása MM:SS formátumra
const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const format = (num: number) => num.toString().padStart(2, '0');

    return `${format(minutes)}:${format(remainingSeconds)}`;
};

export const usePomodoroTimer = (settings: PomodoroSettings) => {

    // --- ÁLLAPOTOK ---
    const [isRunning, setIsRunning] = useState(false);
    const [currentPhase, setCurrentPhase] = useState<Phase>('Focus');
    const [cycle, setCycle] = useState(1);

    // --- SEGÉDFÜGGVÉNYEK ---

    // Kiszámítja az aktuális fázis teljes időtartamát másodpercekben
    const getPhaseDuration = useCallback((phase: Phase): number => {
        switch (phase) {
            case 'Focus':
                return settings.workDurationMin * 60;
            case 'ShortBreak':
                return settings.shortBreakDurationMin * 60;
            case 'LongBreak':
                return settings.longBreakDurationMin * 60;
            default:
                return settings.workDurationMin * 60;
        }
    }, [settings]);

    // RESET LOGIKA
    const resetTimer = useCallback((currentSettings: PomodoroSettings) => {
        // Visszaállítja az időzítő állapotát a Fókusz fázis kezdetére
        const focusDuration = currentSettings.workDurationMin * 60;

        setIsRunning(false);
        setCurrentPhase('Focus');
        setCycle(1);

        return focusDuration;
    }, []);

    // --- TIME LEFT ÁLLAPOT INICIALIZÁLÁSA ---
    const initialTime = useMemo(() => resetTimer(settings), [resetTimer, settings]);
    const [timeLeft, setTimeLeft] = useState(initialTime);

    // --- KÜLSŐ VEZÉRLŐ FUNKCIÓK ---

    const handleStartPause = useCallback(() => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    }, []);

    const handleReset = useCallback(() => {
        // A külső reset gombnyomásra hívja a reset logikát
        const newTime = resetTimer(settings);
        setTimeLeft(newTime);
    }, [settings, resetTimer]);

    // --- EFFECTEK ---

    // 1. KÉSŐI INICIALIZÁLÁS ÉS BEÁLLÍTÁS VÁLTOZÁS FIGYELÉS (API/USER MODOSÍTÁS)
    useEffect(() => {
        // Ha az időzítő fut, nem szabad megszakítani!
        if (!isRunning) {
            // Inicializálás az aktuális beállításokkal
            const newTime = resetTimer(settings);
            setTimeLeft(newTime);
        }

    }, [settings, resetTimer, isRunning]);

    // 2. IDŐZÍTŐ LOGIKA (Visszaszámlálás)
    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        // CLEAN-UP FUNKCIÓ
        return () => clearInterval(timerId);
    }, [isRunning, timeLeft]);

    // 3. FÁZISVÁLTÓ LOGIKA (Amikor az idő nullára ér)
    useEffect(() => {
        if (timeLeft === 0) {

            // Ha nem fut (manuálisan lett megállítva), nem váltunk fázist
            if (!isRunning) return;

            if (currentPhase === 'Focus') {

                if (cycle === settings.loops) {
                    // CIKLUS VÉGE KÖVETKEZIK: Long Break
                    setCurrentPhase('LongBreak');
                    setCycle(1);
                    setTimeLeft(getPhaseDuration('LongBreak'));
                } else {
                    // Rövid szünet
                    setCurrentPhase('ShortBreak');
                    setCycle((prevCycle) => prevCycle + 1);
                    setTimeLeft(getPhaseDuration('ShortBreak'));
                }
            } else { // Ha szünet volt (ShortBreak vagy LongBreak)

                if (currentPhase === 'LongBreak') {
                    // TELJES CIKLUS VÉGE ÉS STOP!
                    // Meghívjuk a handleReset-et, ami leállítja az isRunning-ot és nullázza az időt.
                    handleReset();
                    return;

                } else {
                    // ShortBreak után vissza a Fókuszhoz
                    setCurrentPhase('Focus');
                    setTimeLeft(getPhaseDuration('Focus'));
                }
            }
        }
    }, [timeLeft, currentPhase, cycle, settings.loops, getPhaseDuration, isRunning, handleReset]);

    // --- VISSZATÉRÉSI ÉRTÉKEK ---
    return {
        timeLeft,
        isRunning,
        currentPhase,
        cycle,
        handleStartPause,
        handleReset,
        formatTime,
    };
};