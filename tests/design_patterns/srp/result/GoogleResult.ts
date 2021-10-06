import { Page } from "@playwright/test";
import SearchSuggestion from "../common/SearchSuggestion";
import SearchWidget from "../common/SearchWidget";
import NavigationBar from './NavigationBar';
import ResultStat from './ResultStat';


export default class GoogleResult{

    private _searchSuggestion: SearchSuggestion;
    private _searchWidget: SearchWidget;
    private _navigationBar: NavigationBar;
    private _resultStat: ResultStat;
    private _page:Page;


    constructor(page: Page){
        this._page = page;
        this._searchSuggestion = new SearchSuggestion(page);
        this._searchWidget = new SearchWidget(page);
        this._navigationBar = new NavigationBar(page);
        this._resultStat = new ResultStat(page);
    }

    public get searchSuggestion(){
        return this._searchSuggestion;
    }

    public get searchWidget(){
        return this._searchWidget;
    }

    public get navigationBar(){
        return this._navigationBar;
    }

    public get resultStat(){
        return this._resultStat;
    }
    
}