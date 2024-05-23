"use strict";
import _0x3fb20f from "axios";
class bard {
    constructor() {}
    async question({
        ask: r
    }) {
        if (!r) throw new Error("Please specify a question!");
        try {
            return (await _0x3fb20f.post("https://bard.rizzy.eu.org/api/onstage", {
                ask: r
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })).data
        } catch (r) {
            throw new Error("Error: " + r.message)
        }
    }
    async questionWithImage({
        ask: r,
        image: a
    }) {
        if (!r) throw new Error("Please specify a question!");
        if (!a) throw new Error("Please specify a URL for the image!");
        try {
            return (await _0x3fb20f.post("https://bard.rizzy.eu.org/api/onstage/image", {
                ask: r,
                image: a
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })).data
        } catch (r) {
            throw new Error("Error: " + r.message)
        }
    }
}
export default bard;
