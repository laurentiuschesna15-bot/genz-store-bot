import { saveDB } from '../config.js';

export async function commandAdmin(ctx) {
    const { sock, m, from, args, command, isAdmin, isBotAdmin, isOwner, chatSettings, participants } = ctx;
    const adminCommands = ['antilink', 'badword', 'kick', 'promote', 'demote', 'grup', 'hidetag', 'infogc'];
    
    if (!adminCommands.includes(command)) return;
    if (!from.endsWith('@g.us')) return;
    if (!isAdmin && !isOwner) return await sock.sendMessage(from, { text: 'Fitur ini khusus Admin grup!' });

    switch (command) {
        case 'antilink':
            if (args[0] === 'on') {
                chatSettings.antilink = true; saveDB();
                await sock.sendMessage(from, { text: 'Anti-Link diaktifkan!' });
            } else {
                chatSettings.antilink = false; saveDB();
                await sock.sendMessage(from, { text: 'Anti-Link dimatikan.' });
            }
            break;

        case 'badword':
            if (args[0] === 'on') {
                chatSettings.badword = true; saveDB();
                await sock.sendMessage(from, { text: 'Filter Badword diaktifkan!' });
            } else {
                chatSettings.badword = false; saveDB();
                await sock.sendMessage(from, { text: 'Filter Badword dimatikan.' });
            }
            break;

        case 'kick':
            if (!isBotAdmin) return await sock.sendMessage(from, { text: 'Bot harus jadi admin!' });
            let targetKick = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || (args[0] ? args[0].replace('@', '') + '@s.whatsapp.net' : null);
            if (!targetKick) return;
            await sock.groupParticipantsUpdate(from, [targetKick], 'remove');
            break;

        case 'promote':
            if (!isBotAdmin) return;
            let targetP = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || (args[0] ? args[0].replace('@', '') + '@s.whatsapp.net' : null);
            if (targetP) await sock.groupParticipantsUpdate(from, [targetP], 'promote');
            break;

        case 'demote':
            if (!isBotAdmin) return;
            let targetD = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || (args[0] ? args[0].replace('@', '') + '@s.whatsapp.net' : null);
            if (targetD) await sock.groupParticipantsUpdate(from, [targetD], 'demote');
            break;

        case 'grup':
            if (!isBotAdmin) return;
            if (args[0] === 'open') {
                await sock.groupSettingUpdate(from, 'not_announcement');
            } else if (args[0] === 'close') {
                await sock.groupSettingUpdate(from, 'announcement');
            }
            break;

        case 'hidetag':
            let teks = args.join(' ') || 'Pengumuman!';
            await sock.sendMessage(from, { text: teks, mentions: participants.map(v => v.id) });
            break;

        case 'infogc':
            const info = `*ℹ️ PROTEKSI GRUP ACTIVE:*
            
» Anti-Link: ${chatSettings.antilink ? '✅ ON' : '❌ OFF'}
» Badword: ${chatSettings.badword ? '✅ ON' : '❌ OFF'}`;
            await sock.sendMessage(from, { text: info }, { quoted: m });
            break;
    }
}
