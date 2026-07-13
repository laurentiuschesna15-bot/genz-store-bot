export async function commandDownloader({ sock, from, command, args, m }) {
    const dlCommands = ['tiktok', 'tiktokmp3', 'ytmp4', 'ytmp3', 'ig', 'facebook'];
    if (!dlCommands.includes(command)) return;

    if (!args[0]) return await sock.sendMessage(from, { text: `⚠️ Masukkan URL/Link yang ingin diunduh!\nContoh: *.${command} https://...*` }, { quoted: m });

    await sock.sendMessage(from, { text: '⏳ Mohon tunggu, sedang memproses unduhan...' }, { quoted: m });

    try {
        switch (command) {
            case 'tiktok': {
                // Contoh integrasi API Tikwm (Gratis & Tanpa Apikey)
                let res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(args[0])}`).then(r => r.json());
                if (!res.data) return await sock.sendMessage(from, { text: '❌ Gagal mengambil data. Pastikan link TikTok valid!' });
                
                await sock.sendMessage(from, { 
                    video: { url: res.data.play }, 
                    caption: `🎵 *Title:* ${res.data.title}\n👤 *Author:* ${res.data.author.nickname}` 
                }, { quoted: m });
                break;
            }
            case 'tiktokmp3': {
                let res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(args[0])}`).then(r => r.json());
                if (!res.data) return await sock.sendMessage(from, { text: '❌ Gagal mengambil audio!' });
                
                await sock.sendMessage(from, { 
                    audio: { url: res.data.music }, 
                    mimetype: 'audio/mp4',
                    ptt: false
                }, { quoted: m });
                break;
            }
            case 'ytmp4':
            case 'ytmp3':
            case 'ig':
            case 'facebook':
                // Stub untuk API pihak ketiga pilihan Anda (misal: Aira API, Lolhuman, dll.)
                await sock.sendMessage(from, { text: `✨ Fitur ${command} memerlukan integrasi API Key premium Anda.` }, { quoted: m });
                break;
        }
    } catch (e) {
        console.error(e);
        await sock.sendMessage(from, { text: '❌ Terjadi kesalahan pada server pengunduh.' });
    }
}
