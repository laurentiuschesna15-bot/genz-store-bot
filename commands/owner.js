import { db, saveDB, config } from '../config.js';

// Fungsi pembantu format durasi waktu
function msToDuration(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    let minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    return `${days} Hari, ${hours} Jam, ${minutes} Menit`;
}

export async function commandOwner(ctx) {
    const { sock, from, command, args, m, isOwner, sender } = ctx;
    
    const ownerCommands = ['addowner', 'delowner', 'listowner', 'tambahsewa', 'delsewa', 'ceksewa', 'totalsewa'];
    if (!ownerCommands.includes(command)) return;

    // Sistem Validasi Akses Khusus untuk Fitur Owner/Sewa (Kecuali ceksewa)
    if (command !== 'ceksewa' && !isOwner) {
        return await sock.sendMessage(from, { text: '❌ Perintah ini ilegal! Khusus Owner Utama.' }, { quoted: m });
    }

    switch (command) {
        // ================= [ MANAJEMEN OWNER ] =================
        case 'addowner': {
            let target = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || (args[0] ? args[0].replace('@', '') + '@s.whatsapp.net' : null);
            if (!target) return await sock.sendMessage(from, { text: '⚠️ Tag/masukkan nomor target!' }, { quoted: m });
            
            if (db.owners.includes(target)) return await sock.sendMessage(from, { text: '👥 Target sudah berstatus Owner.' });
            
            db.owners.push(target);
            saveDB();
            await sock.sendMessage(from, { text: `✅ Berhasil mengangkat @${target.split('@')[0]} sebagai Owner tambahan.`, mentions: [target] });
            break;
        }

        case 'delowner': {
            let target = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || (args[0] ? args[0].replace('@', '') + '@s.whatsapp.net' : null);
            if (!target) return;

            if (!db.owners.includes(target)) return await sock.sendMessage(from, { text: '❌ Target bukan owner.' });

            db.owners = db.owners.filter(id => id !== target);
            saveDB();
            await sock.sendMessage(from, { text: `🗑️ Jabatan owner @${target.split('@')[0]} telah dicabut.`, mentions: [target] });
            break;
        }

        case 'listowner': {
            let list = `*👑 OWNER DATA UTAMA*:\n• @${config.ownerNumber.split('@')[0]}\n\n*🛡️ STAF/OWNER TAMBAHAN*:\n`;
            if (db.owners.length === 0) list += '_Tidak ada staf tambahan._';
            for (let ow of db.owners) {
                list += `• @${ow.split('@')[0]}\n`;
            }
            await sock.sendMessage(from, { text: list, mentions: [config.ownerNumber, ...db.owners] }, { quoted: m });
            break;
        }

        // ================= [ MANAJEMEN RENTAL SEWA ] =================
        case 'tambahsewa': {
            if (!from.endsWith('@g.us')) return await sock.sendMessage(from, { text: '⚠️ Perintah ini wajib dilakukan di dalam grup target!' });
            let jumlahHari = parseInt(args[0]);
            if (isNaN(jumlahHari)) return await sock.sendMessage(from, { text: '⚠️ Masukkan jumlah hari sewa!\nContoh: *.tambahsewa 30*' }, { quoted: m });

            const expiredTimestamp = Date.now() + (jumlahHari * 24 * 60 * 60 * 1000);
            
            // Jika grup sudah berlangganan sebelumnya, akumulasikan waktunya
            if (db.rentals[from] && db.rentals[from] > Date.now()) {
                db.rentals[from] += (jumlahHari * 24 * 60 * 60 * 1000);
            } else {
                db.rentals[from] = expiredTimestamp;
            }
            
            saveDB();
            await sock.sendMessage(from, { 
                text: `🎉 *SEWA BOT BERHASIL DIAKTIFKAN*\n\n` +
                      `📅 Durasi Tambahan: ${jumlahHari} Hari\n` +
                      `⏳ Total Masa Aktif: ${msToDuration(db.rentals[from] - Date.now())}`
            }, { quoted: m });
            break;
        }

        case 'delsewa': {
            if (!from.endsWith('@g.us')) return;
            if (!db.rentals[from]) return await sock.sendMessage(from, { text: '❌ Grup ini tidak terdaftar dalam sewa.' });
            
            delete db.rentals[from];
            saveDB();
            await sock.sendMessage(from, { text: '🗑️ Masa sewa grup berhasil dihapus secara paksa.' });
            break;
        }

        case 'ceksewa': {
            // Bisa diakses oleh siapapun untuk memantau sisa sewa grup mereka
            if (!from.endsWith('@g.us')) return;
            if (!db.rentals[from]) return await sock.sendMessage(from, { text: 'ℹ️ Bot ini berstatus Free/Gratis di grup ini atau belum didaftarkan sewa.' }, { quoted: m });

            const sisa = db.rentals[from] - Date.now();
            if (sisa <= 0) {
                await sock.sendMessage(from, { text: '⚠️ Masa sewa telah habis!' });
            } else {
                await sock.sendMessage(from, { 
                    text: `⏳ *SISA MASA SEWA BOT*\n\n🤖 *Bot:* ${config.botName}\n📉 *Sisa Waktu:* ${msToDuration(sisa)}\n\n_Hubungi owner jika ingin memperpanjang masa rental._` 
                }, { quoted: m });
            }
            break;
        }

        case 'totalsewa': {
            let totalTxt = `╭━━━〔 📑 DATA RENTAL GRUP 〕━━━⬣\n`;
            let keys = Object.keys(db.rentals);
            if (keys.length === 0) totalTxt += `┃ _Belum ada grup yang menyewa bot._\n`;
            
            for (let jid of keys) {
                let sisaWaktu = db.rentals[jid] - Date.now();
                if (sisaWaktu > 0) {
                    totalTxt += `┃ 🏢 *ID:* ${jid}\n┃ ⏳ *Sisa:* ${msToDuration(sisaWaktu)}\n┃ ───────────────\n`;
                }
            }
            totalTxt += `╰━━━━━━━━━━━━━━━━━━━━━━━━⬣`;
            await sock.sendMessage(from, { text: totalTxt }, { quoted: m });
            break;
        }
    }
}
