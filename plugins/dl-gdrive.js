import fg from 'api-dylux'
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `✳️ Enter a Google Drive link`
  m.react(rwait)
  try {
    let gd = await fg.GDriveDl(args[0])
    const response = await fetch(gd.downloadUrl)

    console.log(gd.downloadUrl);

    let res = await conn.sendLoader(m.chat, m, response, "GD Downloader", 500);

    // get filename
    const arrayBuffer = await res.arrayBuffer()
    const videoBuffer = Buffer.from(arrayBuffer)
    const header = response.headers.get('Content-Disposition');
    const parts = header.split(';');
    const filename = parts[1].split('=')[1];

    const tex = `
⊱ ─── [ Aoi FBDL ] ─── ⊰

↳ *TITLE :* ${result.title}
↳ *SIZE  :* ${result.size}`

    conn.sendFile(m.chat, videoBuffer, filename, tex, m)
    m.react(done)
  } catch {
    m.reply('Error: Check the link or try another link')
  }
}
handler.help = ['gdrive']
handler.tags = ['downloader', 'premium']
handler.command = ['gdrive']
//handler.credit = true
//handler.premium = true

export default handler
