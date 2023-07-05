import { AdminAdList, Fetch } from "./Fetch";

export class AdListView {
    private _table: HTMLTableElement;
    private _prototypeRow: HTMLDivElement;

    private _pageNavigation: HTMLDivElement;

    private _editPanel: HTMLDivElement;

    private _pageItemCount: number;

    // private _currentPageIndex: number;
    // private _navigationOffset: number;

    public constructor() {
        const table = this._table = document.getElementById("big_table") as HTMLTableElement;
        this._prototypeRow = table.children[1].children[0] as HTMLDivElement;
        
        this._pageNavigation = document.getElementById("page_navigation") as HTMLDivElement;

        this._editPanel = document.getElementById("when_click_edit") as HTMLDivElement;

        for (const tBody of table.tBodies) {
            table.removeChild(tBody);
        }

        this._pageItemCount = 10;

        // this._currentPageIndex = 0;
        // this._navigationOffset = 0;
    }

    public async initialize(): Promise<void> {
        await this.renderAdList(1);
    }

    public async renderAdList(pageIndex: number): Promise<void> {
        pageIndex -= 1;
        
        const adList = await Fetch.requestAdminList(
            pageIndex * this._pageItemCount, 
            this._pageItemCount
        );

        const adCount = adList.adCount;

        const table = this._table;
        for (const tBody of table.tBodies) {
            table.removeChild(tBody);
        }

        const tBody = document.createElement("tbody");

        for (const adData of adList.data) {
            tBody.appendChild(this._createRowElement(adData));
        }

        table.appendChild(tBody);

        const pageNavigation = this._pageNavigation;
        pageNavigation.innerHTML = "";

        const pageCount = Math.ceil(adCount / this._pageItemCount);
        for (let i = 0; i < pageCount; ++i) {
            const pageButton = document.createElement("a");
            pageButton.textContent = (i + 1).toString();
            pageButton.style.margin = "0 5px";
            if (pageIndex !== i) {
                pageButton.style.color = "#0000dd";
                pageButton.style.cursor = "pointer";
                pageButton.onclick = () => this.renderAdList(i + 1);
            }
            pageNavigation.appendChild(pageButton);
        }
    }

    private _createRowElement(adData: AdminAdList["data"][number]): HTMLDivElement {
        const newRow = this._prototypeRow.cloneNode(true) as HTMLDivElement;

        newRow.children[0].textContent = adData.adId.toString();
        newRow.children[1].textContent = adData.name;
        newRow.children[2].textContent = `${adData.periodBegin} ~ ${adData.periodEnd}`;
        newRow.children[3].textContent = adData.maxViewCount.toString();
        newRow.children[4].textContent = adData.createdAt;

        const itemControls = newRow.children[5];
        (itemControls.children[0] as HTMLButtonElement).onclick = () =>
            this.openDetailPanel(adData.adId);
        (itemControls.children[1] as HTMLButtonElement).onclick = () =>
            this.openEditPanel(adData.adId);
        (itemControls.children[2] as HTMLButtonElement).onclick = () =>
            Fetch.deleteAd(adData.adId);

        return newRow;
    }
        

    public async openDetailPanel(adId: number): Promise<void> {
        adId;
    }

    public closeDetailPanel(): void {

    }

    public async openEditPanel(adId: number): Promise<void> {
        adId;
        this._editPanel.style.display = "flex";
    }

    public closeEditPanel(): void {
        this._editPanel.style.display = "none";
    }
}
