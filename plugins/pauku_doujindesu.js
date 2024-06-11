import jsdom from 'jsdom'
import cloudscraper from "cloudscraper"


const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

const doujin_url = `https://doujindesu.tv/`;
const {
    JSDOM
} = jsdom;

let handler = async (m, all) => {
    const {
        conn,
        args,
        usedPrefix,
        text,
        command
    } = all
    all.m = m;
    try {
        if (text) {
            switch (args[0]) {
                case "update":
                    return await d_updates(all);
                    break;

                case "search":
                    return await d_search(all);
                    break;

                case "genres":
                    return await d_genres(all);
                    break;

                case "lists":
                    return await d_lists(all);
                    break;

                case "types":
                    return await d_types(all);
                    break;

                case "authors":
                    return await d_authors(all);
                    break;

                case "series":
                    return await d_series(all);
                    break;

                case "characters":
                    return await d_characters(all);
                    break;

                case "info":
                    return await d_info(all);
                    break;

                case "eps":
                    return await d_eps(all);
                    break;

                default:
                    return await d_search(all);
                    break;
            }
        }

        return await d_menu(all);
    } catch (error) {
        return m.reply(`Error: Jika dibawah ada code HTML brrti gagal menembus Cloudflare, coba lagi nanti..\n\n${readmore+error.message}`)
    }
}

handler.help = ['doujindesu']
handler.tags = ['downloader', "anime"]
handler.command = /^(doujin|doujindesu)$/i
handler.register = true
export default handler

async function d_updates({
    m,
    conn,
    usedPrefix,
    command
}) {
    const get = await cloudscraper.get(doujin_url);
    const {
        document
    } = (new JSDOM(get)).window;
    const feed = Array.from(document.querySelectorAll("section.feed"))
    const updates_doujin = Array.from(feed[0].querySelectorAll(".entries .entry"));
    const updates_doujin_obj = updates_doujin.map(e => {
        return {
            id: `${usedPrefix + command} info ${e.querySelector("a").href}`,
            title: e.querySelector("h3.title").textContent.trim(),
            description: e.querySelector(".artists span").textContent.trim()
        }
    })

    const updates_manhwa = Array.from(feed[1].querySelectorAll(".entries .entry"));
    const updates_manhwa_obj = updates_manhwa.map(e => {
        return {
            id: `${usedPrefix + command} info ${e.querySelector("a").href}`,
            title: e.querySelector("h3.title").textContent.trim(),
            description: e.querySelector(".artists span").textContent.trim()
        }
    })

    conn.sendList(m.chat, "Doujindesu Update", `\n\nDaftar Doujinshi Terbaru Subtitle Indonesia`, "Lihat Update", `https://image.thum.io/get/fullpage/${doujin_url}`, [{
        title: "𝙐𝙥𝙙𝙖𝙩𝙚 𝘿𝙤𝙪𝙟𝙞𝙣𝙨𝙝𝙞/𝙈𝙖𝙣𝙜𝙖",
        rows: updates_doujin_obj
    }, {
        title: "𝙐𝙥𝙙𝙖𝙩𝙚 𝙈𝙖𝙣𝙝𝙬𝙖18",
        rows: updates_manhwa_obj
    }])
}

async function d_search({
    m,
    conn,
    usedPrefix,
    command,
    args,
    text
}) {
    if(args[0] == "search") {
        const text_tutor =`*Botak bastard* : "Bang cara search doujin gmna bang? dah sange ni pen baca NTR"\n\n*Owner Cakep* : \nGini gans, luh ketik *${usedPrefix+command} <judulnya>* \n\nkalau masih belum paham klik tombol contoh dibawah\n\n`;
        return await conn.sendButton(m.chat, text_tutor, author, `https://image.thum.io/get/fullpage/${doujin_url}`, [
            [`${usedPrefix+command} okaa-san`, `${usedPrefix+command} okaa-san`]
        ], null, [
            ['join bang', `https://s.id/doujinlife`]
        ], m)
    } 

    const get = await cloudscraper.get(doujin_url + `?s=${text}`);
    const {
        document
    } = (new JSDOM(get)).window;
    const feed = document.querySelector("section.feed")
    const search_doujin = Array.from(feed.querySelectorAll(".entries .entry"));
    const search_doujin_obj = search_doujin.map(e => {
        return {
            id: `${usedPrefix + command} info ${e.querySelector("a").href}`,
            title: e.querySelector("h3.title").textContent.trim(),
            description: e.querySelector(".score").textContent.trim() + " - " + e.querySelector(".status").textContent.trim()
        }
    })

    conn.sendList(m.chat, "Doujindesu Search", `\nHasil Pencarian dari "${text}"`, "Hasil Pencarian", `https://image.thum.io/get/fullpage/${doujin_url}?s=${text}`, [{
        title: "Hasil Pencarian",
        rows: search_doujin_obj
    }])

}

async function d_info({
    m,
    conn,
    usedPrefix,
    command,
    args,
    text
}) {
    const get = await cloudscraper.get(`${doujin_url+args[1]}`);
    const {
        document
    } = (new JSDOM(get)).window;

    console.log(document);
}

async function d_menu({
    m,
    conn,
    usedPrefix,
    command
}) {
    conn.sendList(m.chat, "Doujindesu Menu", `\n\nDownload Doujinshi Subtitle Indonesia`, "Menu Doujindesu", `https://image.thum.io/get/fullpage/${doujin_url}`, [{
        title: "Main Menu",
        rows: [{
            id: `${usedPrefix + command} update`,
            title: "Update",
            description: "Menampilkan Doujin yang baru dirilis."
        }, {
            id: `${usedPrefix + command} search`,
            title: "Search",
            description: "langkah2 untuk mencari doujin."
        }, {
            id: `${usedPrefix + command} genres`,
            title: "Genres",
            description: "Menampilkan daftar Genre Doujinshi."
        }, {
            id: `${usedPrefix + command} lists`,
            title: "Lists",
            description: "Daftar Semua Doujin."
        }, {
            id: `${usedPrefix + command} types`,
            title: "Types",
            description: "Pilih Jenis Doujin."
        }, {
            id: `${usedPrefix + command} authors`,
            title: "Authors",
            description: "Pilih Doujin berdasarkan authornya."
        }, {
            id: `${usedPrefix + command} series`,
            title: "Series",
            description: "Pilih Doujin berdasarkan seriesnya."
        }, {
            id: `${usedPrefix + command} characters`,
            title: "Characters",
            description: "Pilih Doujin berdasarkan Chara-nya."
        }]
    }])
}

async function waifuPics() {
    const get_pic = await fetch("https://api.waifu.pics/sfw/waifu");
    const res_pic = await get_pic.json();
    return res_pic ?.url;
}

const isValidUrl = urlString => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}