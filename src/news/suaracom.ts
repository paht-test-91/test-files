import got from "got";
import cheerio from "cheerio";
import type { Suaracom } from "./types";

export default async function suaracom(): Promise<Suaracom[]> {
    const html = await got('https://www.suara.com/news').text()
    const $ = cheerio.load(html)
    const results: Suaracom[] = []
    $('div.widget-content > ul.list-unstyled > li.item-outer').each((i, el) => {
        const $el = $(el)
        const title = $el.find('h4.post-title > a.ellipsis2').text()
        const link = $el.find('h4.post-title > a.ellipsis2').attr('href')
        const description = $el.find('div.item-content > p.ellipsis2').text()
        const image = $el.find('div.post-thumb > a > img').attr('src')
        const date = $el.find('.suara-date-box > span').map((i, el) => $(el).text()).get().join(' ')
        if (title)
            results.push({
                title,
                link,
                image,
                description,
                date,
            })
    })
    return results
}