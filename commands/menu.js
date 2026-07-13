import { config } from '../config.js';

export async function commandMenu({ sock, from, command, m }) {
    if (command !== 'menu' && command !== 'help') return;

    const p = config.prefix; // Mengambil prefix dinamis (. / ! / dll)

    const menuText = `╭━━━〔 ⌬ Gen Z Store Bot ⌬ 〕━━━⬣
┃ ⧉ BOT     : ${config.botName}
┃ ⧉ VERSION : ${config.version}
┃ ⧉ STATUS  : ONLINE
┃ ⧉ REGION  : INDONESIA
╰━━━━━━━━━━━━━━━━━━━━━━━━⬣

⟦ INITIALIZING SYSTEM... ⟧
⟦ LOADING MODULE ████████ 100% ⟧
━━━━━━━━━━━━━━━━━━━━━━━━
━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 🕌 FITUR ISLAMI
━━━━━━━━━━━━━━━━━━━━━━━━
🕌 ${p}san (AI SANTRI)
🕌 ${p}tijan
🕌 ${p}azan
🕌 ${p}doa
🕌 ${p}hadis
🕌 ${p}hadist
🕌 ${p}jadwalsholat
🕌 ${p}jadwalsholat2
🕌 ${p}listsurah
🕌 ${p}niatsolat
🕌 ${p}surah
🕌 ${p}zikir
----------------------------------------------
🔸 ${p}menu-logoteks

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 👑 FITUR ADMIN
━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ ${p}upswgcadmin
⚙️ ${p}addbadword
⚙️ ${p}antilink
⚙️ ${p}approve
⚙️ ${p}ban
⚙️ ${p}banfitur
⚙️ ${p}delbadword
⚙️ ${p}delete
⚙️ ${p}demoteall
⚙️ ${p}demote
⚙️ ${p}editdeskripsi
⚙️ ${p}editsubject
⚙️ ${p}fixchat
⚙️ ${p}gcside
⚙️ ${p}giveaway
⚙️ ${p}mulaigiveaway
⚙️ ${p}grup
⚙️ ${p}hidetag
⚙️ ${p}kick
⚙️ ${p}listabsen
⚙️ ${p}listadmin
⚙️ ${p}listalluser
⚙️ ${p}listmember
⚙️ ${p}listnoabsen
⚙️ ${p}listban
⚙️ ${p}mute
⚙️ ${p}unmute
⚙️ ${p}off
⚙️ ${p}on
⚙️ ${p}promoteall
⚙️ ${p}promote
⚙️ ${p}resetlinkgrup
⚙️ ${p}setdemote
⚙️ ${p}setpromote
⚙️ ${p}settemplateList
⚙️ ${p}templatelist
----------------------------
⚙️ ${p}on welcome
⚙️ ${p}setwelcome
⚙️ ${p}addgambarwelcome
⚙️ ${p}delgambarwelcome
⚙️ ${p}on left
⚙️ ${p}setleft
⚙️ ${p}addgambarleft
⚙️ ${p}delgambarleft
----------------------------
⚙️ ${p}setclosegc
⚙️ ${p}setopengc
⚙️ ${p}setppgc
⚙️ ${p}setppgroup
⚙️ ${p}slr
⚙️ ${p}tagall
⚙️ ${p}top
⚙️ ${p}resettotalchat
⚙️ ${p}totalchat
⚙️ ${p}unban
⚙️ ${p}unbanfitur
⚙️ ${p}warn
⚙️ ${p}warning
⚙️ ${p}listwarning
⚙️ ${p}list
⚙️ ${p}debugwarn

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 🚫 FITUR ANTI LINK
━━━━━━━━━━━━━━━━━━━━━━━━
🚫 ${p}antilink on/off
🚫 ${p}antilinkv2 on/off
🚫 ${p}antilinkwa on/off
🚫 ${p}antilinkwav2 on/off
🚫 ${p}antilinkch on/off
🚫 ${p}antilinkchv2 on/off
🚫 ${p}antidelete on/off
🚫 ${p}antiedit on/off
🚫 ${p}antigame on/off
🚫 ${p}antifoto on/off
🚫 ${p}antivideo on/off
🚫 ${p}antiaudio on/off
🚫 ${p}antidocument on/off
🚫 ${p}antikontak on/off
🚫 ${p}antisicker on/off
🚫 ${p}antipolling on/off
🚫 ${p}antispamchat on/off
🚫 ${p}antivirtex on/off
🚫 ${p}badword on/off
🚫 ${p}badwordv2 on/off
🚫 ${p}badwordv3 on/off
🚫 ${p}detectblacklist on/off
🚫 ${p}detectblacklist2 on/off
🚫 ${p}demote on/off
🚫 ${p}left on/off
🚫 ${p}promote on/off
🚫 ${p}welcome on/off
🚫 ${p}waktusholat on/off
🚫 ${p}onlyadmin on/off
🚫 ${p}antibot on/off
🚫 ${p}antitagsw on/off
🚫 ${p}antitagsw2 on/off
🚫 ${p}antitagmeta on/off
🚫 ${p}antitagmeta2 on/off
🚫 ${p}antiforward on/off
🚫 ${p}antiforward2 on/off
🚫 ${p}antihidetag on/off
🚫 ${p}antihidetag2 on/off

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 👥 FITUR GRUP
━━━━━━━━━━━━━━━━━━━━━━━━
👥 ${p}absen
👥 ${p}istirahat
👥 ${p}badword
👥 ${p}listbadword
👥 ${p}belilimit
👥 ${p}ceklimit
👥 ${p}cekprem
👥 ${p}cekpremium
👥 ${p}ceksewa
👥 ${p}ambilppsaya
👥 ${p}ikut
👥 ${p}infogc
👥 ${p}infogrub
👥 ${p}linkgrup
👥 ${p}me
👥 ${p}limit
👥 ${p}me2
👥 ${p}kirimlimit
👥 ${p}sendmoney
👥 ${p}setakun

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 📥 DOWNLOADER
━━━━━━━━━━━━━━━━━━━━━━━━
📥 ${p}facebook
📥 ${p}fb5
📥 ${p}ytmp5
📥 ${p}ytmp4
📥 ${p}ytmp3
📥 ${p}play
📥 ${p}tiktok
📥 ${p}tiktokmp3
📥 ${p}ig
📥 ${p}twitter
📥 ${p}snackvideo
📥 ${p}capcut
📥 ${p}mediafire
📥 ${p}sfotify

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 📰 BERITA
━━━━━━━━━━━━━━━━━━━━━━━━
📰 ${p}aljazeera
📰 ${p}antara
📰 ${p}cnn
📰 ${p}cnbc
📰 ${p}jpnn
📰 ${p}kumparan
📰 ${p}merdeka
📰 ${p}okezone
📰 ${p}republika
📰 ${p}sindonews
📰 ${p}tempo

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 📜 FITUR KERTAS
━━━━━━━━━━━━━━━━━━━━━━━━
📜 ${p}karetas
📜 ${p}kertas
📜 ${p}kertaskuning
📜 ${p}kertashitam
📜 ${p}identitaswhatsapp

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 🔹 IDENTITAS MEDSOS
━━━━━━━━━━━━━━━━━━━━━━━━
🔹 ${p}identitasfb
🔹 ${p}identitastiktok
🔹 ${p}identitasyt
🔹 ${p}identitaswhatsapp

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 🤖 KASEP AI
━━━━━━━━━━━━━━━━━━━━━━━━
🤖 ${p}sep
🤖 ${p}rumi
🤖 ${p}upin
🤖 ${p}dalle
🤖 ${p}groq
🤖 ${p}hd
🤖 ${p}buatgambar
🤖 ${p}simi
🤖 ${p}dokter
🤖 ${p}ai
🤖 ${p}lirik
🤖 ${p}ailirik
🤖 ${p}stablediffusion
🤖 ${p}gpt
🤖 ${p}vn
🤖 ${p}vnanime
🤖 ${p}cekorang
-------------------------------
♦️ ${p}maya
♦️ ${p}ubahai
♦️ ${p}addhukum
♦️ ${p}delhukum
♦️ ${p}listhukum

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 🔎 PENCARIAN
━━━━━━━━━━━━━━━━━━━━━━━━
🔎 ${p}googleimage
🔎 ${p}ytsearch
🔎 ${p}carivideotiktok
🔎 ${p}pinterest
🔎 ${p}flash
🔎 ${p}carigithub
🔎 ${p}growgarden
🔎 ${p}kodepos

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 🎤 SUARA AI
━━━━━━━━━━━━━━━━━━━━━━━━
🎤 ${p}nara
🎤 ${p}mojang
🎤 ${p}ayu
🎤 ${p}siti

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 🎨 EDIT GAMBAR
━━━━━━━━━━━━━━━━━━━━━━━━
🎨 ${p}tofigure
🎨 ${p}tofigure2
🎨 ${p}tofigure3
🎨 ${p}gambarprompt
🎨 ${p}jadianime
🎨 ${p}disneykan
🎨 ${p}pixarkan
🎨 ${p}kartunkan
🎨 ${p}cyberpunkkan
🎨 ${p}vangoghkan
🎨 ${p}pixelkan
🎨 ${p}komikkan
🎨 ${p}hijabkan
🎨 ${p}hitamkan
🎨 ${p}putihkan
🎨 ${p}ghiblikan
🎨 ${p}editgambar
🎨 ${p}carbon
🎨 ${p}carbonpp
🎨 ${p}blur
🎨 ${p}semucoklat
🎨 ${p}kebalik
🎨 ${p}kegeser
🎨 ${p}hitamputih
🎨 ${p}pembesar
🎨 ${p}miringkan
🎨 ${p}sepia
🎨 ${p}tajam
🎨 ${p}wanted
🎨 ${p}wasted

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 🎮 GAMES
━━━━━━━━━━━━━━━━━━━━━━━━
🔰 ${p}caklontong
🔰 ${p}cekkodam
🔰 ${p}family100
🔰 ${p}tebakangka
🔰 ${p}tebakbendera
🔰 ${p}tebakbom
🔰 ${p}tebakgambar
🔰 ${p}tebakhewan
🔰 ${p}tebakkalimat
🔰 ${p}tebakkata
🔰 ${p}tebaklagu
🔰 ${p}tebaklirik

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 🛍️ STORE
━━━━━━━━━━━━━━━━━━━━━━━━
🛍️ ${p}addlist
🛍️ ${p}dellist
🛍️ ${p}done
🛍️ ${p}selesai
🛍️ ${p}list
🛍️ ${p}proses
🛍️ ${p}renamelist
🛍️ ${p}resetlist
🛍️ ${p}setlist reset
🛍️ ${p}setdone
🛍️ ${p}setlist
🛍️ ${p}setproses
🛍️ ${p}updatelist

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 🎭 STICKER BRAT
━━━━━━━━━━━━━━━━━━━━━━━━
🎭 ${p}brat
🎭 ${p}bratbiru
🎭 ${p}bratmerah
🎭 ${p}brathitam
🎭 ${p}bratvid

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 📝 STICKER QC
━━━━━━━━━━━━━━━━━━━━━━━━
📝 ${p}qc
📝 ${p}qcmerah
📝 ${p}qchijau
📝 ${p}qcbiru
📝 ${p}qckuning
📝 ${p}qchitam
📝 ${p}qcputih
📝 ${p}qcabu
📝 ${p}qcjingga
📝 ${p}qcungu
📝 ${p}qcpink
📝 ${p}qccoklat

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 🌟 STICKER
━━━━━━━━━━━━━━━━━━━━━━━━
🌟 ${p}s
🌟 ${p}ais
🌟 ${p}attp
🌟 ${p}attp2
🌟 ${p}bb
🌟 ${p}bbhitama
🌟 ${p}bbping
🌟 ${p}teksus
🌟 ${p}qcstick
🌟 ${p}smeme
🌟 ${p}sticker
🌟 ${p}tovid
🌟 ${p}togif
🌟 ${p}ttp
🌟 ${p}twibbon
🌟 ${p}wm

⌬ ✨ MORE
━━━━━━━━━━━━━━━━━━━━━━━━
✨ ${p}ratellimit
✨ ${p}report
✨ ${p}runtime
✨ ${p}style
✨ ${p}style10
✨ ${p}style2
✨ ${p}style3
✨ ${p}style4
✨ ${p}style5
✨ ${p}style6
✨ ${p}style7
✨ ${p}style8
✨ ${p}style9

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ 👑 OWNER
━━━━━━━━━━━━━━━━━━━━━━━━
👑 ${p}addglobalbadword
👑 ${p}addlevel
👑 ${p}addlimit
👑 ${p}addmoney
👑 ${p}addowner
👑 ${p}addpremium
👑 ${p}addrespon
👑 ${p}addpremgroup
👑 ${p}blacklist
👑 ${p}block
👑 ${p}buatstory
👑 ${p}buatstori
👑 ${p}upsw
👑 ${p}cleandb
👑 ${p}clearsesi
👑 ${p}clearchat
👑 ${p}creategrub
👑 ${p}delglobalbadword
👑 ${p}delowner
👑 ${p}delpremium
👑 ${p}delrespons
👑 ${p}delsewa
👑 ${p}delpremgroup
👑 ${p}demoteme
👑 ${p}gctag
👑 ${p}join
👑 ${p}listblacklist
👑 ${p}listblock
👑 ${p}listpremium
👑 ${p}listrespons
👑 ${p}listsewa2
👑 ${p}listsewa
👑 ${p}listnosewa
👑 ${p}outallgrup
👑 ${p}outgrup
👑 ${p}outnosewa
👑 ${p}promoteme
👑 ${p}reset
👑 ${p}resetlevel
👑 ${p}resetlimit
👑 ${p}resetmoney
👑 ${p}restart
👑 ${p}self
👑 ${p}public
👑 ${p}setbio
👑 ${p}setname
👑 ${p}setppbot
👑 ${p}sewabot
👑 ${p}sewabotid
👑 ${p}tambahsewa
👑 ${p}toadmin
👑 ${p}totalsewa
👑 ${p}unblacklist
👑 ${p}unblock
👑 ${p}update
👑 ${p}upswgc

━━━━━━━━━━━━━━━━━━━━━━━━
⌬ ℹ️ INFO
━━━━━━━━━━━━━━━━━━━━━━━━
ℹ️ ${p}infogempa
ℹ️ ${p}cekewallet
ℹ️ ${p}listsan
ℹ️ ${p}lihatdetailsan
ℹ️ ${p}cekdns
ℹ️ ${p}cekhost
ℹ️ ${p}cekidgc
ℹ️ ${p}cekuser
ℹ️ ${p}ipcheck
ℹ️ ${p}checkip
ℹ️ ${p}cekip
ℹ️ ${p}ipchecker
ℹ️ ${p}emojimix
ℹ️ ${p}get
ℹ️ ${p}git
ℹ️ ${p}remini
ℹ️ ${p}image
ℹ️ ${p}img
ℹ️ ${p}inspect
ℹ️ ${p}id
ℹ️ ${p}lorem
ℹ️ ${p}now
ℹ️ ${p}numberbot
ℹ️ ${p}ping
ℹ️ ${p}ping2
ℹ️ ${p}createqr
ℹ️ ${p}removebg
ℹ️ ${p}nobg
ℹ️ ${p}rvo
ℹ️ ${p}ssweb
ℹ️ ${p}tomp3
ℹ️ ${p}tourl
ℹ️ ${p}tourl2
ℹ️ ${p}tovpn
ℹ️ ${p}toimg
ℹ️ ${p}tom4a
ℹ️ ${p}ts
ℹ️ ${p}translate
ℹ️ ${p}voicechanger
ℹ️ ${p}whois

━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ NOTE:
Command harus sama persis dengan menu!

━━━━━━━━━━━━━━━━━━━━━━━

⌬ Gen Z Store Bot © 2026
╰━━〔 SYSTEM ACTIVE 〕━━⬣`;

    await sock.sendMessage(from, { text: menuText }, { quoted: m });
}
