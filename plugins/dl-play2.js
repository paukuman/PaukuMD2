import _0x13a052 from 'node-fetch';
import _0x3a08bf from 'yt-search';
import _0x2aa4cb from 'ytdl-core';
import _0x1fb66b from 'axios';
let handler = async (_0x4e07eb, {
  command: _0x65cea5,
  conn: _0x1c49ef,
  text: _0x55e557
}) => {
  if (!_0x55e557) {
    throw "No text to search, please enter the name of the song you want to play.\n\n*EXAMPLE:\n#play2  - Hope xxxtentacion*";
  }
  try {
    if (_0x65cea5 === "play2") {
      _0x1c49ef.reply(_0x4e07eb.chat, "*_sending your audio..._*", _0x4e07eb);
      try {
        let _0x92eb01 = await _0x13a052("https://api.lolhuman.xyz/api/ytplay2?apikey=" + lolkeysapi + "&query=" + _0x55e557);
        let _0x5f16fe = await _0x92eb01.json();
        let _0x5394aa = await _0x1c49ef.sendMessage(_0x4e07eb.chat, {
          audio: {
            url: _0x5f16fe.result.audio
          },
          fileName: "error.mp3",
          mimetype: "audio/mp4"
        }, {
          quoted: _0x4e07eb
        });
        if (!_0x5394aa) {
          return await _0x1c49ef.sendFile(_0x4e07eb.chat, _0x5f16fe.result.audio, "error.mp3", null, _0x4e07eb, false, {
            mimetype: "audio/mp4"
          });
        }
      } catch {
        let _0x4f6b15 = await ytPlay(_0x55e557);
        let _0x4db2eb = _0x4f6b15.result2[0x0].audio || _0x4f6b15.result2[0x1].audio || _0x4f6b15.result2[0x2].audio || _0x4f6b15.result2;
        _0x1c49ef.sendMessage(_0x4e07eb.chat, {
          audio: {
            url: _0x4db2eb
          },
          fileName: "error.mp3",
          mimetype: "audio/mp4"
        }, {
          quoted: _0x4e07eb
        });
      }
    }
    if (_0x65cea5 === "playvid") {
      _0x1c49ef.reply(_0x4e07eb.chat, "*_⏳Processing your video...⏳_*", _0x4e07eb);
      try {
        let _0x1c3220 = await ytPlayVid(_0x55e557);
        await _0x1c49ef.sendMessage(_0x4e07eb.chat, {
          video: {
            url: _0x1c3220.result
          },
          fileName: 'error.mp4',
          caption: wm,
          thumbnail: _0x1c3220.thumb,
          mimetype: "video/mp4"
        }, {
          quoted: _0x4e07eb
        });
      } catch {
        let _0x442e2b = await _0x13a052("https://api.lolhuman.xyz/api/ytplay2?apikey=" + lolkeysapi + "&query=" + _0x55e557);
        let _0x290c76 = await _0x442e2b.json();
        await _0x1c49ef.sendFile(_0x4e07eb.chat, _0x290c76.result.video, "error.mp4", "_𝑇𝛨𝛯 𝐺𝑈𝑅𝑈 𝐵𝛩𝑇_", _0x4e07eb);
      }
    }
  } catch (_0x4c92b9) {
    _0x4e07eb.reply("*Error occurred, please try again later.*");
  }
};
handler.help = ["play2", "playvid"].map(_0x216473 => _0x216473 + " <text>");
handler.tags = ["downloader"];
handler.command = ["play2", 'playvid'];
export default handler;
function bytesToSize(_0x5d0ed1) {
  return new Promise((_0x4a5d71, _0x5d15b2) => {
    const _0x532408 = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (_0x5d0ed1 === 0x0) {
      return 'n/a';
    }
    const _0x7a9eec = parseInt(Math.floor(Math.log(_0x5d0ed1) / Math.log(0x400)), 0xa);
    if (_0x7a9eec === 0x0) {
      _0x4a5d71(_0x5d0ed1 + " " + _0x532408[_0x7a9eec]);
    }
    _0x4a5d71((_0x5d0ed1 / 0x400 ** _0x7a9eec).toFixed(0x1) + " " + _0x532408[_0x7a9eec]);
  });
}
async function ytMp3(_0x904bcc) {
  return new Promise((_0x425196, _0x5a183d) => {
    _0x2aa4cb.getInfo(_0x904bcc).then(async _0x3176ce => {
      let _0x2de57e = [];
      for (let _0xc30f62 = 0x0; _0xc30f62 < _0x3176ce.formats.length; _0xc30f62++) {
        let _0x55bbd0 = _0x3176ce.formats[_0xc30f62];
        if (_0x55bbd0.mimeType === "audio/webm; codecs=\"opus\"") {
          let {
            contentLength: _0x549698
          } = _0x55bbd0;
          let _0x165332 = await bytesToSize(_0x549698);
          _0x2de57e[_0xc30f62] = {
            audio: _0x55bbd0.url,
            size: _0x165332
          };
        }
      }
      let _0x4676f1 = _0x2de57e.filter(_0x27a1a5 => _0x27a1a5.audio !== undefined && _0x27a1a5.size !== undefined);
      let _0x2ff9b7 = await _0x1fb66b.get('https://tinyurl.com/api-create.php?url=' + _0x4676f1[0x0].audio);
      let _0x565ab5 = _0x2ff9b7.data;
      let _0x47309c = _0x3176ce.videoDetails.title;
      let _0x2170cc = _0x3176ce.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0x0].url;
      _0x425196({
        title: _0x47309c,
        result: _0x565ab5,
        result2: _0x4676f1,
        thumb: _0x2170cc
      });
    })["catch"](_0x5a183d);
  });
}
async function ytMp4(_0x453da5) {
  return new Promise(async (_0x232ab3, _0x34c604) => {
    _0x2aa4cb.getInfo(_0x453da5).then(async _0x10b367 => {
      let _0x376fb6 = [];
      for (let _0xb2a5ef = 0x0; _0xb2a5ef < _0x10b367.formats.length; _0xb2a5ef++) {
        let _0x1acb02 = _0x10b367.formats[_0xb2a5ef];
        if (_0x1acb02.container === "mp4" && _0x1acb02.hasVideo === true && _0x1acb02.hasAudio === true) {
          let {
            qualityLabel: _0x65ebba,
            contentLength: _0x5ad987
          } = _0x1acb02;
          let _0x1f5669 = await bytesToSize(_0x5ad987);
          _0x376fb6[_0xb2a5ef] = {
            video: _0x1acb02.url,
            quality: _0x65ebba,
            size: _0x1f5669
          };
        }
      }
      let _0x5f47d9 = _0x376fb6.filter(_0x68260 => _0x68260.video !== undefined && _0x68260.size !== undefined && _0x68260.quality !== undefined);
      let _0x187b56 = await _0x1fb66b.get('https://tinyurl.com/api-create.php?url=' + _0x5f47d9[0x0].video);
      let _0x51c6d0 = _0x187b56.data;
      let _0x1d2200 = _0x10b367.videoDetails.title;
      let _0x1de4d0 = _0x10b367.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0x0].url;
      _0x232ab3({
        title: _0x1d2200,
        result: _0x51c6d0,
        rersult2: _0x5f47d9[0x0].video,
        thumb: _0x1de4d0
      });
    })['catch'](_0x34c604);
  });
}
async function ytPlay(_0x59f37b) {
  return new Promise((_0x3e3e35, _0x14e4e0) => {
    _0x3a08bf(_0x59f37b).then(async _0x333de7 => {
      let _0x258876 = _0x333de7.videos.slice(0x0, 0x5);
      let _0x1cacf4 = [];
      for (let _0x1ef4d7 = 0x0; _0x1ef4d7 < _0x258876.length; _0x1ef4d7++) {
        _0x1cacf4.push(_0x258876[_0x1ef4d7].url);
      }
      let _0x47db9a = _0x1cacf4[0x0];
      let _0x24972d = await ytMp3(_0x47db9a);
      _0x3e3e35(_0x24972d);
    })["catch"](_0x14e4e0);
  });
}
async function ytPlayVid(_0x42b669) {
  return new Promise((_0x24ed78, _0x4c3fcb) => {
    _0x3a08bf(_0x42b669).then(async _0x1c378c => {
      let _0x8f8674 = _0x1c378c.videos.slice(0x0, 0x5);
      let _0x15db92 = [];
      for (let _0x57fec6 = 0x0; _0x57fec6 < _0x8f8674.length; _0x57fec6++) {
        _0x15db92.push(_0x8f8674[_0x57fec6].url);
      }
      let _0x73ca6 = _0x15db92[0x0];
      let _0x3dd3e9 = await ytMp4(_0x73ca6);
      _0x24ed78(_0x3dd3e9);
    })['catch'](_0x4c3fcb);
  });
}
