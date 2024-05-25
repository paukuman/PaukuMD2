import _0xf85905 from "cheerio";
import _0x3e64a6 from "node-fetch";
import _0x1446b3 from "axios";
async function sekaikomikDl(_0x281ece) {
    let _0x44a26d = await _0x3e64a6(_0x281ece),
        _0x25e5f8 = _0xf85905.load(await _0x44a26d.text()),
        _0x546e7f = _0x25e5f8("script").map(((t, e) => _0x25e5f8(e).html())).toArray();
    return _0x546e7f = _0x546e7f.filter((t => /wp-content/i.test(t))), _0x546e7f = eval(_0x546e7f[0].split('"images":')[1].split("}],")[0]), _0x546e7f.map((t => encodeURI(t)))
}
async function facebookDl(t) {
    let e = await _0x3e64a6("https://fdownloader.net/"),
        a = _0xf85905.load(await e.text())('input[name="__RequestVerificationToken"]').attr("value"),
        i = await (await _0x3e64a6("https://fdownloader.net/api/ajaxSearch", {
            method: "post",
            headers: {
                cookie: e.headers.get("set-cookie"),
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                referer: "https://fdownloader.net/"
            },
            body: new URLSearchParams(Object.entries({
                __RequestVerificationToken: a,
                q: t
            }))
        })).json(),
        o = _0xf85905.load(i.data),
        r = {};
    return o(".button.is-success.is-small.download-link-fb").each((function() {
        let t = o(this).attr("title").split(" ")[1],
            e = o(this).attr("href");
        e && (r[t] = e)
    })), r
}
async function tiktokStalk(t) {
    let e = await _0x1446b3.get("https://urlebird.com/user/" + t + "/"),
        a = _0xf85905.load(e.data);
    return {
        pp_user: a('div[class="col-md-auto justify-content-center text-center"] > img').attr("src"),
        name: a("h1.user").text().trim(),
        username: a("div.content > h5").text().trim(),
        followers: a('div[class="col-7 col-md-auto text-truncate"]').text().trim().split(" ")[1],
        following: a('div[class="col-auto d-none d-sm-block text-truncate"]').text().trim().split(" ")[1],
        description: a("div.content > p").text().trim()
    }
}
async function igStalk(t) {
    t = t.replace(/^@/, "");
    const e = await (await _0x3e64a6("https://dumpor.com/v/" + t)).text(),
        a = _0xf85905.load(e),
        i = a("div.user__title > a > h1").text().trim(),
        o = a("div.user__title > h4").text().trim(),
        r = a("div.user__info-desc").text().trim(),
        n = a("div.user__img").attr("style")?.replace("background-image: url('", "").replace("');", ""),
        s = a("#user-page > div.container > div > div > div:nth-child(1) > div > a"),
        l = s.eq(0).text().replace(/Posts/i, "").trim(),
        c = s.eq(2).text().replace(/Followers/i, "").trim(),
        d = s.eq(3).text().replace(/Following/i, "").trim(),
        p = a("ul.list > li.list__item");
    return {
        name: i,
        username: o,
        description: r,
        postsH: l,
        posts: parseInt(p.eq(0).text().replace(/Posts/i, "").trim().replace(/\s/g, "")),
        followersH: c,
        followers: parseInt(p.eq(1).text().replace(/Followers/i, "").trim().replace(/\s/g, "")),
        followingH: d,
        following: parseInt(p.eq(2).text().replace(/Following/i, "").trim().replace(/\s/g, "")),
        profilePic: n
    }
}
async function xnxxdl(t) {
    try {
        const e = await _0x3e64a6(t),
            a = await e.text(),
            i = _0xf85905.load(a)("#video-player-bg > script:nth-child(6)").html();
        return {
            low: (i.match("html5player.setVideoUrlLow\\('(.*?)'\\);") || [])[1],
            high: i.match("html5player.setVideoUrlHigh\\('(.*?)'\\);")[1],
            HLS: i.match("html5player.setVideoHLS\\('(.*?)'\\);")[1]
        }
    } catch (t) {
        return console.error(t), null
    }
}
async function xnxxSearch(t) {
    const e = await _0x3e64a6("https://www.xnxx.com/search/" + t + "/" + (Math.floor(3 * Math.random()) + 1), {
            method: "get"
        }),
        a = await e.text(),
        i = _0xf85905.load(a, {
            xmlMode: !1
        });
    let o = [];
    return i("div.mozaique").each((function(t, e) {
        const a = i(e).find("div.thumb a").map(((t, e) => "https://www.xnxx.com" + i(e).attr("href").replace("/THUMBNUM/", "/"))).get(),
            r = i(e).find("div.thumb-under a").map(((t, e) => i(e).attr("title"))).get();
        for (let t = 0; t < a.length; t++) o.push({
            title: r[t],
            link: a[t]
        })
    })), o
}
async function ChatGpt(t, e) {
    const a = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Referer: "https://2chat.c3r.ink/",
                accept: "application/json, text/plain, */*"
            },
            body: JSON.stringify({
                prompt: t,
                options: {},
                regenerate: !1,
                roomId: 1002,
                uuid: Date.now(),
                systemMessage: e,
                top_p: 1,
                temperature: .8
            })
        },
        i = await _0x3e64a6("https://chatapicn.a3r.fun/api/chat-process", a),
        o = await i.text();
    return JSON.parse(o.split("\n").pop())
}
async function xvideosSearch(t) {
    return new Promise((async e => {
        const a = await _0x1446b3.request("https://www.xvideos.com/?k=" + t + "&p=" + (Math.floor(9 * Math.random()) + 1), {
                method: "get"
            }),
            i = _0xf85905.load(a.data, {
                xmlMode: !1
            }),
            o = [],
            r = [],
            n = [],
            s = [],
            l = [],
            c = [];
        i("div.mozaique > div > div.thumb-under > p.title").each((function(t, e) {
            o.push(i(this).find("a").attr("title")), r.push(i(this).find("span.duration").text()), s.push("https://www.xvideos.com" + i(this).find("a").attr("href"))
        })), i("div.mozaique > div > div.thumb-under").each((function(t, e) {
            n.push(i(this).find("span.video-hd-mark").text())
        })), i("div.mozaique > div > div > div.thumb > a").each((function(t, e) {
            l.push(i(this).find("img").attr("data-src"))
        }));
        for (let t = 0; t < o.length; t++) c.push({
            title: o[t],
            duration: r[t],
            quality: n[t],
            thumb: l[t],
            url: s[t]
        });
        e(c)
    }))
}
async function xvideosdl(t) {
    return new Promise((async e => {
        const a = await _0x3e64a6(t, {
                method: "get"
            }),
            i = await a.text(),
            o = _0xf85905.load(i, {
                xmlMode: !1
            }),
            r = o("meta[property='og:title']").attr("content"),
            n = o("meta[name='keywords']").attr("content"),
            s = o("div#video-tabs > div > div > div > div > strong.mobile-hide").text() + " views",
            l = o("div.rate-infos > span.rating-total-txt").text(),
            c = o("span.rating-good-nbr").text(),
            d = o("span.rating-bad-nbr").text(),
            p = o("meta[property='og:image']").attr("content");
        e({
            status: 200,
            result: {
                title: r,
                url: o("#html5video > #html5video_base > div > a").attr("href"),
                keyword: n,
                views: s,
                vote: l,
                likes: c,
                dislikes: d,
                thumb: p
            }
        })
    }))
}
export {
    sekaikomikDl,
    facebookDl,
    tiktokStalk,
    igStalk,
    xnxxdl,
    xnxxSearch,
    ChatGpt,
    xvideosSearch,
    xvideosdl
};
