import _0x406196 from 'node-fetch';
let handler = async (_0x47a04a, {
  conn: _0x4a7b4b,
  args: _0x1facfe,
  usedPrefix: _0x2fa54b,
  command: _0x104623,
  text: _0x53666f
}) => {
  if (!_0x53666f && !(_0x47a04a.quoted && _0x47a04a.quoted.text)) {
    throw "Please provide some text or quote a message to get a response.";
  }
  if (!_0x53666f && _0x47a04a.quoted && _0x47a04a.quoted.text) {
    _0x53666f = _0x47a04a.quoted.text;
  }
  _0x47a04a.reply("thinking...");
  _0x47a04a.react('🤔');
  const _0x16d711 = encodeURIComponent(_0x53666f);
  let _0x2b4311 = await Bing(_0x16d711);
  if (!_0x2b4311) {
    throw new Error("No valid JSON response from Bing ");
  }
  await _0x4a7b4b.reply(_0x47a04a.chat, _0x2b4311.result, _0x47a04a);
};
handler.help = ["bing"];
handler.tags = ['ai'];
handler.command = /^(bing)$/i;
export default handler;
async function Bing(_0x2f3bdc) {
  const _0x1ea7d6 = {
    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"
  };
  const _0x4c0ac0 = await _0x406196("https://aemt.me/bingai?text=" + _0x2f3bdc, {
    method: "get",
    headers: _0x1ea7d6
  });
  const _0x497387 = await _0x4c0ac0.json();
  return _0x497387;
}
