export async function commandGames({ sock, from, command, args, m, sender }) {
    const gameCommands = ['cekkodam', 'tebakangka'];
    if (!gameCommands.includes(command)) return;

    if (command === 'cekkodam') {
        let nama = args.join(' ');
        if (!nama) return await sock.sendMessage(from, { text: '⚠️ Masukkan nama kamu! Contoh: *.cekkodam Agus*' }, { quoted: m });

        const listKodam = [
            'Macan Cisewu', 'Buaya Putih', 'Nyi Blorong', 'Tutup Panci', 'Sendok Bebek', 
            'Singa Dangdut', 'Undur-undur Pincang', 'Kecoa Sakti', 'Naga Hitam', 'Jin Tomang'
        ];
        let hasilKodam = listKodam[Math.floor(Math.random() * listKodam.length)];

        let teks = `╔══ 🎉 *CEK KODAM KHODAM* 🎉 ══╗\n\n👤 *Nama:* ${nama}\n🐯 *Khodam:* ${hasilKodam}\n\n╚════════════════════╝`;
        await sock.sendMessage(from, { text: teks }, { quoted: m });
    }

    if (command === 'tebakangka') {
        let targetAngka = Math.floor(Math.random() * 10) + 1;
        await sock.sendMessage(from, { text: '🎲 Bot telah memilih angka dari *1 sampai 10*. Coba tebak dengan membalas pesan ini!' }, { quoted: m });
        // Logika kelanjutan tebak angka bisa dikembangkan menggunakan sesi db.users
    }
}
