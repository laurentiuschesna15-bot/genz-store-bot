import fs from 'fs';

export const config = {
    botName: "GEN Z STORE BOT",
    version: "V.2.ESM.KG",
    ownerNumber: "6285163018877@s.whatsapp.net", // Owner Utama (Kunci Absolut)
    prefix: ".",
    pairingNumber: "6285169644258"
};

export let db = {
    chats: {},
    users: {},
    owners: [],   // Menyimpan list owner tambahan
    rentals: {}   // Menyimpan masa aktif sewa grup
};

if (fs.existsSync('./database.json')) {
    db = JSON.parse(fs.readFileSync('./database.json', 'utf-8'));
}

export const saveDB = () => {
    fs.writeFileSync('./database.json', JSON.stringify(db, null, 2));
};
