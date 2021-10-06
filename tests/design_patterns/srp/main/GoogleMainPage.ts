import {Page} from '@playwright/test';
import SearchSuggestion from '../common/SearchSuggestion';
import SearchWidget from '../common/SearchWidget';


export default class GoogleMainPage{

    private page: Page;
    private _searchWidget: SearchWidget;
    private _searchSuggestion: SearchSuggestion;

    constructor(page: Page){
        this.page = page;
        this._searchWidget = new SearchWidget(page);
        this._searchSuggestion = new SearchSuggestion(page);
    }

    public async goto(){
        await this.page.goto("https://www.google.com/");
    }

    
    public get searchWidget(){
        return this._searchWidget;
    }

    public get searchSuggestion(){
        return this._searchSuggestion;
    }

    
}