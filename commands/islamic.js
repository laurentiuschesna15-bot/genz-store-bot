export async function commandIslamic({ sock, from, command, m }) {
    const islamCommands = ['san', 'azan', 'doa', 'hadis', 'listsurah', 'surah'];
    if (!islamCommands.includes(command)) return;

    switch (command) {
        case 'san':
            await sock.sendMessage(from, { text: '🕌 *AI Santri*: Fitur ini siap diintegrasikan dengan API Keagamaan.' }, { quoted: m });
            break;
        case 'azan':
            await sock.sendMessage(from, { text: '🔊 Masukkan nama kota untuk mengecek jadwal azan.' }, { quoted: m });
            break;
        case 'doa':
            await sock.sendMessage(from, { text: '🤲 Menampilkan daftar doa harian segera.' }, { quoted: m });
            break;
        default:
            await sock.sendMessage(from, { text: `✨ Fitur ${command} sedang dalam pemeliharaan.` }, { quoted: m });
            break;
    }
}
