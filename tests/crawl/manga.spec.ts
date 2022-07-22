import { test, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path'
import download from 'image-downloader';
import axios from 'axios';



async function getImagesFromUrl(page: Page, url: string){
    let images = [];
    await page.goto(url, {waitUntil: "domcontentloaded"});
    await page.waitForSelector("picture");
    const pictureTags = await page.$$("picture");
    for(let pictureTag of pictureTags){
        const imgTag = await pictureTag.$("img");
        const dataSource = await imgTag.getAttribute("data-src");
        images.push(dataSource);
    }   
    return images;

}

async function dowloadImageToPath(imgUrl: string, path: string){
    if(!fs.existsSync(path)){
        fs.mkdirSync(path)
    }
    await download.image({
        url: imgUrl,
        dest: path
    })

}







const json: {chapter: number, link: string}[] = JSON.parse(fs.readFileSync(`${__dirname}/kindaichi_links.json`).toString())

test('Crawl mangapill @crawl', async({page}) => {

    for (let i = 0 ; i < 2; i++){
        const url = json[i].link;
        const pictures = await getImagesFromUrl(page, url);
        for  (let pic of pictures){
            let paths = path.join(`${__dirname}` , `/chap_${json[i].chapter}`)
            await dowloadImageToPath(pic, paths)
    
        }
    }


})




test('Crawl mangapil kindaichi', async({page}) => {
    let kindaichi = [];
    await page.goto("https://mangapill.com/manga/2328/kindaichi-shounen-no-jikenbo-file-series", {waitUntil: 'domcontentloaded'});
    const links = await page.$$("#chapters a");
    for(let link of links){
        const chapName = (await link.innerText()).replace("Chapter", "").trim();
        const href = await link.getAttribute("href")
        const data = {"chapter": parseInt(chapName), "link": "https://mangapill.com" + href};
        kindaichi.push(data);
    }
    kindaichi.sort(function (x, y) {
        return x.chapter - y.chapter;
    })
    fs.writeFileSync(`${__dirname}/kindaichi_links.json`, JSON.stringify(kindaichi));
})