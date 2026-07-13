import { config, db, saveDB } from './config.js';
import { commandMenu } from './commands/menu.js';
import { commandAdmin } from './commands/admin.js';
import { commandIslamic } from './commands/islamic.js';
import { commandDownloader } from './commands/downloader.js';
import { commandAI } from './commands/ai.js';
import { commandGames } from './commands/games.js';
import { commandStore } from './commands/store.js';

export async function messageHandler(sock, m) {
    const from = m.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    const sender = m.key.participant || m.key.remoteJid;
    
    const body = m.message.conversation || 
                 m.message.extendedTextMessage?.text || 
                 m.message.imageMessage?.caption || 
                 m.message.videoMessage?.caption || "";
                 
    const isCmd = body.startsWith(config.prefix);
    const command = isCmd ? body.slice(config.prefix.length).trim().split(' ')[0].toLowerCase() : '';
    const args = body.trim().split(/ +/).slice(1);

    // Database Initialization
    if (isGroup && !db.chats[from]) {
        db.chats[from] = { antilink: false, badword: false, welcome: false };
        saveDB();
    }
    const chatSettings = db.chats[from] || {};

    // Group Metadata & Permissions
    let groupMetadata = isGroup ? await sock.groupMetadata(from) : null;
    let participants = isGroup ? groupMetadata.participants : [];
    let groupAdmins = isGroup ? participants.filter(v => v.admin !== null).map(v => v.id) : [];
    let isBotAdmin = isGroup ? groupAdmins.includes(sock.user.id.split(':')[0] + '@s.whatsapp.net') : false;
    let isAdmin = isGroup ? groupAdmins.includes(sender) : false;
    let isOwner = sender === config.ownerNumber;

    // [ SENSOR UTAMA: ANTI LINK ]
    if (isGroup && chatSettings.antilink && !isAdmin && isBotAdmin) {
        if (body.includes('chat.whatsapp.com/') || body.includes('wa.me/settings')) {
            await sock.sendMessage(from, { delete: m.key });
            await sock.groupParticipantsUpdate(from, [sender], 'remove');
            await sock.sendMessage(from, { text: `*» ANTI-LINK DETECTED «*\n@${sender.split('@')[0]} dikeluarkan karena mengirim link!`, mentions: [sender] });
            return;
        }
    }

    // [ SENSOR UTAMA: BADWORD ]
    if (isGroup && chatSettings.badword && !isAdmin && isBotAdmin) {
        const kataKasar = ['anjing', 'bangsat', 'tolol', 'goblok'];
        if (kataKasar.some(word => body.toLowerCase().includes(word))) {
            await sock.sendMessage(from, { delete: m.key });
            return;
        }
    }

    if (!isCmd) return;

    // Mengirim data ke modul masing-masing
    const context = { sock, m, from, args, command, isAdmin, isBotAdmin, isOwner, chatSettings, participants };
    
// Pemanggilan Modul Utama & Tambahan
    await commandMenu(context);
    await commandAdmin(context);
    await commandIslamic(context);
    
    // Modul Baru
    await commandDownloader(context);
    await commandAI(context);
    await commandGames(context);
    await commandStore(context);
}
