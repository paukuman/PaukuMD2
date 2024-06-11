import puppeteer from 'puppeteer';
import jsdom from 'jsdom'
import {
    File
} from 'megajs'
import path from 'path'
import {
    arch
} from 'process';
import {
    setTimeout
} from 'timers/promises';


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

        }

        const get_pic = await fetch("https://api.waifu.pics/sfw/waifu");
        const res_pic = await get_pic.json();
        //const res_buffer = res_pic ? Buffer.from(await (await fetch(res_pic.url)).arrayBuffer()) : false;

        // Create a browser instance
        const browser = await puppeteer.launch({headless: false});

        // Create a new page
        const page = await browser.newPage();

        // Set viewport width and height
        await page.setViewport({
            width: 1280,
            height: 720
        });

        const website_url = 'https://bilibili.tv';

        // Open URL in current page
        await page.goto(website_url, {
            waitUntil: 'networkidle0'
        });

        await page.evaluate(() => {

            [...document.querySelectorAll(".bstar-header__dropdown")]
            .pop()
                .querySelector(".bstar-header-user__btn").click();

            document.querySelector(".bstar-checkbox").click();

            [...document.querySelectorAll(".login-main .bstar-tooltip")][3]
            .querySelector(".bstar-login-button").click();

        });

        // Capture screenshot
        await page.screenshot({
            path: 'screenshot-2.jpg',
        });


        // Close the browser instance
        //await browser.close()

    } catch (error) {
        return m.reply(`Error: ${error.message}`)
    }
}

handler.help = ['bilibili']
handler.tags = ['downloader', "anime"]
handler.command = /^(bilibili|bstation)$/i
export default handler

/*async function waifuPics() {
    const get_pic = await fetch("https://api.waifu.pics/sfw/waifu");
    const res_pic = await get_pic.json();
    return res_pic ?.url;
}*/

const isValidUrl = urlString => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}