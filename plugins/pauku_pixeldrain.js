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
    isPrems
}) => {
    if (!args[0]) throw `✳️ Enter the Pixeldrain link next to the command`
    if (!args[0].match(/pixeldrain/gi)) throw `❎ Link incorrect`
    m.react(rwait)

    let urll = new URL(args[0])
    let pathname = urll.pathname;
    let pixel_id = pathname.split("/")[2];
    let url_api = `https://${urll.hostname}/api/file/${pixel_id}`;
    let get_headers = await fetchresponseheader(url_api);
    let type = get_headers.get("content-type");
    const header = get_headers.get('Content-Disposition');
    const parts = header.split(';');
    const filename = parts[1].split('=')[1];

    m.reply(`Bentar ya bang, lagi di Upload...`);
    await conn.sendFile(m.chat, url_api, filename, '', m, null, {
        mimetype: type,
        asDocument: true
    })
    m.react(done)
}
handler.help = ['pixeldrain <url>']
handler.tags = ['downloader']
handler.command = ['pixeldrain']

export default handler