import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? 'https://my-krew-t2j4.onrender.com' : 'https://my-krew-t2j4.onrender.com';

export const socket = io(URL,
    {
        transports: ['websocket'],
        // autoConnect: false,
    }
    );