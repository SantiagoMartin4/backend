import { v4 as uuidv4 } from 'uuid';

export const generateToken = () => {
    const token = uuidv4();
    const timestamp = Date.now();
    return {
        token,
        timestamp
    };
};

export const verifyToken = (tokenObj) => {
    const now = Date.now();
    const timeElapsed = now - tokenObj.timestamp;
    const timeExpiredToken = 3600000; // 1 hora en milisegundos

    return timeElapsed < timeExpiredToken;
};
