let handler = async function (m, { conn, text, usedPrefix }) {
  m.reply(
    `Member Jancok.`
  )
}
handler.help = ['misuh']
handler.tags = ['game']
handler.command = ['misuh']
handler.register = true
export default handler
