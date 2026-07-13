import makeWASocket, { 
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestBaileysVersion 
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import express from 'express';
import { config } from './config.js';
import { messageHandler } from './handler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot Status: ONLINE'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logLevel: 'silent',
        auth: state,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false
    });

    if (!sock.authState.creds.registered) {
        setTimeout(async () => {
            let code = await sock.requestPairingCode(config.pairingNumber);
            console.log(`\n==========================================\n`);
            console.log(`KODE PAIRING WHATSAPP KAMU: ${code}`);
            console.log(`\n==========================================\n`);
        }, 3000);
    }

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = new Boom(lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) startBot();
        } else if (connection === 'open') {
            console.log('GEN Z STORE BOT ONLINE!');
        }
    });

    sock.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            const m = chatUpdate.messages[0];
            if (!m.message) return;
            await messageHandler(sock, m);
        } catch (err) {
            console.error(err);
        }
    });
}

startBot();
