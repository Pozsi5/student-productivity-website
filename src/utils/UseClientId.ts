const CLIENT_ID_KEY = 'pomodoroClientId';

export const getOrCreateClientId = (): string => {
    let clientId = localStorage.getItem(CLIENT_ID_KEY);

    if (!clientId) {
        // Egyedi ID generálás
        clientId = crypto.randomUUID(); // Vagy egy UUID library
        localStorage.setItem(CLIENT_ID_KEY, clientId);
    }

    return clientId;
};