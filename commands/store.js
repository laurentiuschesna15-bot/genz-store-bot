import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import { db, saveDB } from '../config.js';

export async function commandStore(ctx) {
    const { sock, from, command, args, m, isAdmin, isOwner, body } = ctx;
    const storeCommands = ['addlist', 'dellist', 'list', 'proses', 'done', 'setproses', 'setdone'];
    
    if (!storeCommands.includes(command) && !from.endsWith('@g.us')) return;

    // Inisialisasi database khusus store & settings di grup
    if (from.endsWith('@g.us')) {
        if (!db.chats[from].store) {
            db.chats[from].store = {};
        }
        if (!db.chats[from].storeSettings) {
            db.chats[from].storeSettings = {
                proses: "⚡ *PROSES PERMINTAAN* ⚡\n\n💬 %pesan%\n\n🕒 _Waktu: %waktu%_",
                done: "✅ *PESANAN SELESAI (DONE)* ✅\n\n💬 %pesan%\n\n🙏 Matur nuwun atas kepercayaannya!"
            };
        }
        saveDB();
    }

    const groupStore = db.chats[from]?.store || {};
    const storeSettings = db.chats[from]?.storeSettings || {};

    switch (command) {
        case 'addlist': {
            if (!isOwner) return await sock.sendMessage(from, { text: '❌ Akses Ditolak! Hanya Owner Utama Bot yang dapat menambah produk.' }, { quoted: m });
            
            let [kunci, isi] = args.join(' ').split('|');
            if (!kunci || !isi) {
                const caraPakai = `⚠️ *Format Tambah Produk Salah!*\n\n` +
                                  `Gunakan command ini dengan cara:\n` +
                                  `1. Kirim gambar lalu beri *CAPTION*:\n   *.addlist nama_produk | deskripsi*\n\n` +
                                  `2. Atau *BALAS/REPLY* gambar dengan mengetik:\n   *.addlist nama_produk | deskripsi*`;
                return await sock.sendMessage(from, { text: caraPakai }, { quoted: m });
            }

            const namaKunci = kunci.trim().toLowerCase();
            const deskripsiProduk = isi.trim();
            const quoted = m.message.extendedTextMessage?.contextInfo?.quotedMessage;
            const isImage = m.message.imageMessage || quoted?.imageMessage;
            
            let base64Image = null;
            if (isImage) {
                const mediaData = m.message.imageMessage || quoted.imageMessage;
                try {
                    const stream = await downloadContentFromMessage(mediaData, 'image');
                    let buffer = Buffer.from([]);
                    for await (const chunk of stream) {
                        buffer = Buffer.concat([buffer, chunk]);
                    }
                    base64Image = buffer.toString('base64');
                } catch (err) {
                    return await sock.sendMessage(from, { text: '❌ Gagal mengunduh gambar.' }, { quoted: m });
                }
            }

            groupStore[namaKunci] = {
                text: deskripsiProduk,
                image: base64Image,
                isLocalFile: base64Image ? true : false
            };
            saveDB();

            let teksKonfirmasi = `✅ *PRODUK BERHASIL DITAMBAHKAN*\n\n📦 *Keyword Panggil:* .${namaKunci}\n📝 *Deskripsi:*\n${deskripsiProduk}`;
            if (base64Image) {
                await sock.sendMessage(from, { image: Buffer.from(base64Image, 'base64'), caption: teksKonfirmasi }, { quoted: m });
            } else {
                await sock.sendMessage(from, { text: teksKonfirmasi }, { quoted: m });
            }
            break;
        }

        case 'dellist': {
            if (!isOwner) return await sock.sendMessage(from, { text: '❌ Akses Ditolak! Hanya Owner Utama Bot yang dapat menghapus produk.' }, { quoted: m });
            let kunciDel = args.join(' ').trim().toLowerCase();
            if (!kunciDel) return;
            if (!groupStore[kunciDel]) return await sock.sendMessage(from, { text: '❌ Produk tidak ditemukan.' });

            delete groupStore[kunciDel];
            saveDB();
            await sock.sendMessage(from, { text: `🗑️ Produk *${kunciDel}* berhasil dihapus.` });
            break;
        }

        case 'list': {
            let keys = Object.keys(groupStore);
            if (keys.length === 0) return await sock.sendMessage(from, { text: '🛒 Toko saat ini masih kosong.' });
            let teksStore = `╭━━━〔 🛍️ GEN Z STORE LIST 〕━━━⬣\n`;
            for (let key of keys) { teksStore += `┃ 🔹 *.${key}*\n`; }
            teksStore += `╰━━━━━━━━━━━━━━━━━━━━━━━━⬣\n\n*Ketik perintah di atas untuk melihat detail produk!*`;
            await sock.sendMessage(from, { text: teksStore }, { quoted: m });
            break;
        }

        // ================= [ FITUR BARU: SET TEMPLATE ] =================
        case 'setproses': {
            if (!isOwner) return await sock.sendMessage(from, { text: '❌ Akses Ditolak! Hanya Owner yang bisa mengatur template.' }, { quoted: m });
            let templateBaru = args.join(' ');
            if (!templateBaru) return await sock.sendMessage(from, { text: `⚠️ Masukkan template teks baru!\n\n*Tips Gunakan Kode Panggil:*\n gunakan \`%pesan%\` untuk catatan dan \`%waktu%\` untuk jam otomatis.\n\nContoh:\n*.setproses 🕒 ORDERAN DIPROSES 🕒\n\nBarang: %pesan%\nJam: %waktu%*` }, { quoted: m });

            storeSettings.proses = templateBaru;
            saveDB();
            await sock.sendMessage(from, { text: '✅ Template Balasan *.proses* Berhasil Diubah!' }, { quoted: m });
            break;
        }

        case 'setdone': {
            if (!isOwner) return await sock.sendMessage(from, { text: '❌ Akses Ditolak! Hanya Owner yang bisa mengatur template.' }, { quoted: m });
            let templateBaru = args.join(' ');
            if (!templateBaru) return await sock.sendMessage(from, { text: `⚠️ Masukkan template teks baru!\n\n*Tips Gunakan Kode Panggil:*\n gunakan \`%pesan%\` untuk catatan.\n\nContoh:\n*.setdone 🎉 SUKSES TERKIRIM 🎉\n\n%pesan%\n\nMakasih ordernya!*` }, { quoted: m });

            storeSettings.done = templateBaru;
            saveDB();
            await sock.sendMessage(from, { text: '✅ Template Balasan *.done* Berhasil Diubah!' }, { quoted: m });
            break;
        }

        // ================= [ OPERASIONAL ADM/OWNER ] =================
        case 'proses': {
            if (!isAdmin && !isOwner) return;
            let pesanProses = args.join(' ') || 'Mohon tunggu sebentar...';
            let waktuSekarang = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
            
            // Ambil setting kustom atau gunakan bawaan default
            let template = storeSettings.proses || "⚡ *PROSES PERMINTAAN* ⚡\n\n💬 %pesan%\n\n🕒 _Waktu: %waktu%_";
            let hasilTeks = template.replace('%pesan%', pesanProses).replace('%waktu%', waktuSekarang);
            
            await sock.sendMessage(from, { text: hasilTeks }, { quoted: m });
            break;
        }

        case 'done': {
            if (!isAdmin && !isOwner) return;
            let pesanDone = args.join(' ') || 'Terima kasih telah berbelanja.';
            let waktuSekarang = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
            
            let template = storeSettings.done || "✅ *PESANAN SELESAI (DONE)* ✅\n\n💬 %pesan%\n\n🙏 Matur nuwun atas kepercayaannya!";
            let hasilTeks = template.replace('%pesan%', pesanDone).replace('%waktu%', waktuSekarang);
            
            await sock.sendMessage(from, { text: hasilTeks }, { quoted: m });
            break;
        }
    }

    // Panggil otomatis produk jualan
    const cleanBody = body.startsWith('.') ? body.slice(1).trim().toLowerCase() : body.trim().toLowerCase();
    if (groupStore[cleanBody]) {
        let produk = groupStore[cleanBody];
        if (produk.image) {
            try {
                let opsiGambar = produk.isLocalFile ? Buffer.from(produk.image, 'base64') : { url: produk.image };
                await sock.sendMessage(from, { image: opsiGambar, caption: produk.text }, { quoted: m });
            } catch (error) {
                await sock.sendMessage(from, { text: `${produk.text}\n\n_(⚠️ Gagal memuat gambar produk)_` }, { quoted: m });
            }
        } else {
            await sock.sendMessage(from, { text: typeof produk === 'string' ? produk : produk.text }, { quoted: m });
        }
    }
}
