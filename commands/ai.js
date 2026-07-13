export async function commandAI({ sock, from, command, args, m }) {
    const aiCommands = ['ai', 'gpt', 'simi'];
    if (!aiCommands.includes(command)) return;

    let textQuery = args.join(' ');
    if (!textQuery) return await sock.sendMessage(from, { text: `💬 Mau tanya apa ke AI?\nContoh: *.${command} apa itu vps?*` }, { quoted: m });

    try {
        if (command === 'ai' || command === 'gpt') {
            // Menggunakan API publik Open Source / Bebas tanpa API Key
            let res = await fetch(`https://aemt.me/openai?text=${encodeURIComponent(textQuery)}`).then(r => r.json());
            let reply = res.result || "Maaf, AI sedang tidak merespon.";
            await sock.sendMessage(from, { text: `🤖 *Gen Z AI*:\n\n${reply}` }, { quoted: m });
        } 
        else if (command === 'simi') {
            let res = await fetch(`https://aemt.me/simi?text=${encodeURIComponent(textQuery)}`).then(r => r.json());
            await sock.sendMessage(from, { text: `🐥 *Simi:* ${res.result || 'Hah?'}` }, { quoted: m });
        }
    } catch (e) {
        await sock.sendMessage(from, { text: '❌ Server AI sedang sibuk. Coba lagi nanti.' });
    }
}
