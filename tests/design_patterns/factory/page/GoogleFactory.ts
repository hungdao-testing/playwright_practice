import { Page } from "@playwright/test";
import GoogleArabic from "./GoogleArabic";
import GoogleEnglish from "./GoogleEnglish";
import GoogleFrench from "./GoogleFrench";
import GooglePage from "./GooglePage";


export enum LANG {
    "ENGLISH",
    "FRENCH",
    "ARABIC"
}

export class GoogleFactory {


    public static get(lang: keyof typeof LANG, page: Page) {
        const googleLang: Record<keyof typeof LANG, GooglePage> = {
            "ENGLISH": new GoogleEnglish(page),
            "FRENCH": new GoogleFrench(page),
            "ARABIC": new GoogleArabic(page)
        }
        return googleLang[lang];
    }

}

