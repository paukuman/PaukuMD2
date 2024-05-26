import fg from 'api-dylux'

const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  if (!args[0]) {
    throw `
    Please send the link of a Facebook video\n\n📌 EXAMPLE :\n*${usedPrefix + command}* https://www.facebook.com/Ankursajiyaan/videos/981948876160874/?mibextid=rS40aB7S9Ucbxw6v
    
    Silakan kirimkan tautan video Facebook\n\n📌 CONTOH :\n*${usedPrefix + command}* https://www.facebook.com/Ankursajiyaan/videos/981948876160874/?mibextid=rS40aB7S9Ucbxw6v
    `
  }

  const urlRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
  if (!urlRegex.test(args[0])) {
    throw '⚠️ PLEASE GIVE A VALID URL.'
  }

  m.react(rwait)

  try {
    const result = await fg.fbdl(args[0])
    const response = await fetch(result.videoUrl)
    // get filename
    const header = response.headers.get('Content-Disposition');
    const parts = header.split(';');
    const filename = parts[1].split('=')[1];

    /*
    let res = await conn.sendLoader(m.chat, m, response, "FB Downloader", 500);
    const arrayBuffer = await res.arrayBuffer()
    const videoBuffer = Buffer.from(arrayBuffer)
    */
    const tex = `
─── [ Aoi FB Downloader ] ───

↳ *TITLE :* ${result.title}
↳ *SIZE  :* ${result.size}`

    conn.sendFile(m.chat, result.videoUrl, filename, tex, m)
    m.react(done)
  } catch (error) {
    console.log(error)
    m.reply(`
    ⚠️ An error occurred while processing the request. Please try again later.
    ⚠️ Terjadi kesalahan saat memproses permintaan. Silakan coba lagi nanti.
    `)
  }
}

handler.help = ['facebook <url>']
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i
handler.diamond = true

export default handler