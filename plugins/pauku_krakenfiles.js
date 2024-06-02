import jsdom from "jsdom";

const {
    JSDOM
} = jsdom;

async function fetchresponseheader(surl) {
    return (await fetch(surl, {
        method: 'HEAD'
    })).headers;
}

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command,
    isOwner,
    isPrems,
    text
}) => {
    try {
        if (!args[0]) throw `✳️ Enter the KrakenFiles link next to the command`
        if (!args[0].match(/krakenfiles/gi)) throw `❎ Link incorrect`
        m.react(rwait)

        const get_token = await fetch(args[0], {
            referrer: 'https://krakenfiles.com',
            headers: {
                'Access-Control-Allow-Origin': 'https://krakenfiles.com',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
            }
        });
        const res_token = await get_token.text()
        const {
            document
        } = (new JSDOM(res_token)).window;
        let token = document.querySelector("form input#dl-token")
        if (!token) {
            return m.reply(`Link ${text} tidak dapat di unduh, besar kemungkinan di hapus sama developernya, coba cek..`)
        }

        token = token.value;

        let urll = new URL(args[0]);
        let pathname = urll.pathname;
        let _id = pathname.split("/")[2];
        let url_api = `https://${urll.hostname}/download/${_id}`;
        // get dl url
        var details = {
            token
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        let get_dl_url = await fetch(url_api, {
            method: "POST",
            body: formBody,
            referrer: 'https://krakenfiles.com',
            headers: {
                'Access-Control-Allow-Origin': 'https://krakenfiles.com',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
        const json_api = await get_dl_url.json();
        const {
            url
        } = json_api;

        let get_headers = await fetchresponseheader(url);
        let type = get_headers.get("content-type");
        const header = get_headers.get('Content-Disposition');
        const parts = header.split(';');
        const filename = parts[1].split('=')[1];

        if (get_headers.get("connection") == "close") {
            await m.reply(`Link ${text} tidak dapat di unduh, sepertinya diblokir akses dalam mengunduh..\n\nAoi coba pake trik lain dulu..`);
            const lewat_video = document.querySelector("video#my-video").getAttribute("data-src-url")
            if (lewat_video) {
                await m.reply(`Berhasil mengambil direct Link :v`)
            } else {
                await m.reply(`Yah gagal lagi bang, mending pake link lain atau unduh aja sendiri bang di link ${text}`);
            }
        }

        /*m.reply(`Bentar ya bang, lagi di Unduh...`);
        const response = await fetch(url)
        let res = await conn.sendLoader(m.chat, m, response, "Krakenfiles Downloader", 500);
        const arrayBuffer = await res.arrayBuffer()
        const videoBuffer = Buffer.from(arrayBuffer)*/

        await m.reply(`Bentar ya bang, lagi di Upload...`);
        await conn.sendFile(m.chat, videoBuffer, filename, '', m, null, {
            mimetype: type,
            asDocument: true
        })
        m.react(done)
    } catch (e) {
        m.reply(`Link ${text} tidak dapat di unduh, besar kemungkinan di hapus sama developernya, coba cek..`)
    }
}
handler.help = ['krakenfiles <url>']
handler.tags = ['downloader']
handler.command = ['krakenfiles']

export default handler