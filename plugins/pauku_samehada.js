import jsdom from 'jsdom'
import {
    File
} from 'megajs'
import path from 'path'
import {
    arch
} from 'process';


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
                    return await getUpdates(all);
                    break;

                case "anime":
                    return await getAnime(all);
                    break;
                case "search":

                    return await conn.sendButton(m.chat, `Ambatukam : "Bang gimana caranya nyari judul di fitur samehada? mw nnton anime hitam"\n\nOwner Ganteng : \nCaranya tu gini deck,\nketik .samehada <judul animeknya>\n\nmisal nih ya..\n.samehada Overflow`, author, 'https://telegra.ph/file/3c841d3a633f724d5e650.jpg', [
                        ['Halah ribet, Owner Kontol', `.misuh`]
                    ], null, [
                        ['Oh gitu ya bang, Makasi bang', `https://s.id/doujinlife`]
                    ], m)
                    break;

                case "jadwal":
                    return await jadwalAnime(all);
                    break;

                case "list":
                    return await listAnime(all);
                    break;

                default:
                    return await downloadAnime(all);
                    break;
            }
        }

        const get_pic = await fetch("https://api.waifu.pics/sfw/waifu");
        const res_pic = await get_pic.json();
        //const res_buffer = res_pic ? Buffer.from(await (await fetch(res_pic.url)).arrayBuffer()) : false;

        conn.sendList(m.chat, "Samehadaku Menu", `\n\nDownload Anime Subtitle Indonesia`, "Menu Samehada", await waifuPics(), [{
            title: "Main Menu",
            rows: [{
                id: `${usedPrefix + command} update`,
                title: "Update Terbaru",
                description: "Menampilkan Episode yang baru dirilis."
            }, {
                id: `${usedPrefix + command} search`,
                title: "Cari Anime",
                description: "langkah2 untuk mencari anime."
            }, {
                id: `${usedPrefix + command} jadwal`,
                title: "Jadwal Anime Ongoing",
                description: "Menampilkan daftar anime Ongoing + jadwal rilisnya."
            }, {
                id: `${usedPrefix + command} list`,
                title: "Daftar Anime",
                description: "Menampilkan Daftar Anime menurut Abjad/Alphabet."
            }]
        }])
    } catch (error) {
        return m.reply(`Error: ${error.message}`)
    }
}

handler.help = ['samehadaku']
handler.tags = ['downloader', "anime"]
handler.command = /^(samehada|samehadaku)$/i
export default handler

async function waifuPics() {
    const get_pic = await fetch("https://api.waifu.pics/sfw/waifu");
    const res_pic = await get_pic.json();
    return res_pic ?.url;
}

async function getAnime({
    m,
    conn,
    args,
    usedPrefix,
    text,
    command
}) {
    if (isValidUrl(args[1])) {
        const get = await fetch(args[1]);
        const res = await get.text();
        const {
            document
        } = (new JSDOM(res)).window;
        const title = document.querySelector(".entry-title").textContent.trim();
        const img = document.querySelector("img.anmsa").src;
        const desc = document.querySelector(".desc .entry-content.entry-content-single").textContent.trim();
        const score = document.querySelector("span[itemprop='ratingValue']").textContent.trim();
        const genres = [...document.querySelectorAll(".genre-info a")].map(e => {
            return e.textContent.trim();
        }).join(", ");

        const epss = [...document.querySelectorAll(".lstepsiode.listeps ul li")].map(e => {
            const title = e.querySelector("span.lchx").textContent.trim();
            const url = e.querySelector("span a").href;
            const date = e.querySelector(".date").textContent.trim();

            return {
                id: `${usedPrefix + command} ${url}`,
                title,
                description: date
            }
        })


        conn.sendList(m.chat, "Samehadaku Anime Info", `${title}\n - score : ${score}\n - genres : ${genres}\n - sinopsis : \n${desc}`, `Pilih Episode (${epss.length} Eps)`, img, [{
            title: "Hasil Pencarian",
            rows: epss
        }])
    }
}

async function searchAnime({
    m,
    conn,
    args,
    usedPrefix,
    text,
    command
}) {
    const get = await fetch(`https://samehadaku.email/?s=${text}`);
    const res = await get.text();
    const {
        document
    } = (new JSDOM(res)).window;
    const getlists = [...document.querySelectorAll(".site-main.relat .animpost")]
    const lists = getlists.map(e => {
        const type = e.querySelector(".content-thumb .type").textContent.trim();
        const score = e.querySelector(".score").textContent.trim();
        const title = e.querySelector(".title h2").textContent.trim();
        const status = e.querySelector(".data .type").textContent.trim();
        const url = e.querySelector("a").href;

        return {
            id: `${usedPrefix + command} anime ${url}`,
            title,
            description: `⭐ ${score} ⦾ ${type} ⦾ ${status}`
        }
    })

    conn.sendList(m.chat, "Samehadaku Search", `\nHasil Pencarian dari *${text}*`, `Lihat (${getlists.length} postingan)`, `https://telegra.ph/file/eb52f1e3acbd4e5f4f935.jpg`, [{
        title: "Hasil Pencarian",
        rows: lists
    }])
}

async function listAnime(all) {}

async function jadwalAnime(all) {}

async function downloadAnime(all) {
    const {
        m,
        conn,
        args,
        usedPrefix,
        text,
        command
    } = all;
    if (isValidUrl(args[0])) {
        const updates = await fetch(args[0]);
        const text = await updates.text();
        const {
            document
        } = (new JSDOM(text)).window;
        const posttitle = document.querySelector(".entry-title").textContent.trim();
        const time = document.querySelector(".time-post").textContent.trim();
        const dls = [...document.querySelectorAll("#downloadb")]
        const getdls = dls.map(e => {
            const link_title = e.querySelector("p b").textContent;
            const list = [...e.querySelectorAll("ul li")];

            let dl = [];
            for (let f of list) {
                let span = [...f.querySelectorAll("span")];
                const quality = f.querySelector("strong").textContent;
                for (let s of span) {
                    const url = s.querySelector("a").href;
                    const title = s.querySelector("a").textContent;
                    dl.push({
                        id: `.${get_prefix_link(url)} ${url}`,
                        title,
                        description: quality
                    })
                }
            }

            return {
                title: link_title,
                rows: dl
            }
        })

        conn.sendList(m.chat, "Samehadaku Download", `\n${posttitle}\n`, "Download List", await waifuPics(), getdls)
    } else {
        return await searchAnime(all);
    }
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
async function getUpdates({
    m,
    conn,
    args,
    usedPrefix,
    command
}) {

    const updates = await fetch("https://samehadaku.email");
    const text = await updates.text();
    const {
        document
    } = (new JSDOM(text)).window;
    const posts = [...document.querySelectorAll(".post-show")][0];
    const get_all = [...posts.querySelectorAll("ul li")];
    const send_list_rows = [];
    for (let i = 0; i < get_all.length; i++) {
        let anime_url = get_all[i].querySelector(".entry-title a").href;
        let anime_title = get_all[i].querySelector(".entry-title").textContent;
        let anime_span = get_all[i].querySelectorAll(".dtla span");
        let anime_desc = `${[...anime_span][0].textContent} - ${[...anime_span][2].textContent.replace("Released on:","").trim()}`;
        send_list_rows.push({
            id: `.samehada ${anime_url}`,
            title: anime_title,
            description: anime_desc
        })
    }


    conn.sendList(m.chat, "Samehadaku Updates", `\n\nBerikut daftar Update Episode terbaru di Samehadaku.\nSilahkan dipilih kang/neng :V`, "Episode Terbaru", await waifuPics(), [{
        title: "Latest Update",
        rows: send_list_rows
    }])
}

function get_prefix_link(url) {
    const {
        hostname
    } = new URL(url)
    const prefixs = {
        "gofile.io": "gofile",
        "krakenfiles.com": "krakenfiles",
        "acefile.co": "acefile",
        "pixeldrain.com": "pixeldrain",
        "www.mediafire.com": "mediafire"
    }
    return prefixs[hostname]?prefixs[hostname]:"";
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}