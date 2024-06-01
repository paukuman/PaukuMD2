import jsdom from 'jsdom'
import {
    File
} from 'megajs'
import path from 'path'


const {
    JSDOM
} = jsdom;

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    try {
        if (text) {
            switch (args[0]) {
                case "update":
                    return await getUpdates(conn, m);
                    break;

                case "search":
                    return await searchAnime(conn, m);
                    break;

                case "jadwal":
                    return await jadwalAnime(conn, m);
                    break;

                case "list":
                    return await listAnime(conn, m);
                    break;

                default:
                    return await downloadAnime(conn, m, args);
                    break;
            }
        }

        const get_pic = await fetch("https://api.waifu.pics/sfw/waifu");
        const res_pic = await get_pic.json();
        //const res_buffer = res_pic ? Buffer.from(await (await fetch(res_pic.url)).arrayBuffer()) : false;

        conn.sendList(m.chat, "Samehadaku Menu", `\n\nDownload Anime Subtitle Indonesia`, "Menu Samehada", await waifuPics(), [{
            title: "Main Menu",
            rows: [{
                id: ".samehada update",
                title: "Update Terbaru",
                description: "Menampilkan Episode yang baru dirilis."
            }, {
                id: ".samehada search",
                title: "Cari Anime",
                description: "langkah2 untuk mencari anime."
            }, {
                id: ".samehada jadwal",
                title: "Jadwal Anime Ongoing",
                description: "Menampilkan daftar anime Ongoing + jadwal rilisnya."
            }, {
                id: ".samehada list",
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

async function searchAnime(conn, m, args) {}

async function listAnime(conn, m, args) {}

async function jadwalAnime(conn, m, args) {}

async function downloadAnime(conn, m, args) {
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
            for(let f of list) {
                let span = [...f.querySelectorAll("span")];
                const quality = f.querySelector("strong").textContent;
                for (let s of span) {
                    const url = s.querySelector("a").href;
                    const title = s.querySelector("a").textContent;
                    dl.push({
                        id: `.${title.toLowerCase()} ${url}`,
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
async function getUpdates(conn, m) {

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

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}