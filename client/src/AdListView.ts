import { DeletePanelView } from "./DeletePanelVIew";
import { DetailPanelView } from "./DetailPanelView";
import { EditPanelView } from "./EditPanelView";
import { AdminAdList, Fetch } from "./Fetch";

export class AdListView {
    private readonly _detailPanelView: DetailPanelView;
    private readonly _editPanelView: EditPanelView;
    private readonly _deletePanelView: DeletePanelView;

    private _table: HTMLTableElement;
    private _prototypeRow: HTMLDivElement;

    private _pageNavigation: HTMLDivElement;

    private _pageItemCount: number;

    private _currentPageIndex: number;
    // private _navigationOffset: number;

    public constructor(
        detailPanelView: DetailPanelView,
        editPanelView: EditPanelView,
        deletePanelView: DeletePanelView
    ) {
        this._detailPanelView = detailPanelView;
        this._editPanelView = editPanelView;
        this._deletePanelView = deletePanelView;
        
        const table = this._table = document.getElementById("big_table") as HTMLTableElement;
        this._prototypeRow = table.children[1].children[0] as HTMLDivElement;
        
        this._pageNavigation = document.getElementById("page_navigation") as HTMLDivElement;
        
        for (const tBody of table.tBodies) {
            table.removeChild(tBody);
        }

        this._pageItemCount = 10;

        this._currentPageIndex = 0;
        // this._navigationOffset = 0;

        this._deletePanelView.onDeleted = () => {
            this.renderAdList(this._currentPageIndex);
        };
    }

    public async initialize(): Promise<void> {
        await this.renderAdList(1);
    }

    public async renderAdList(pageIndex: number): Promise<void> {
        this._currentPageIndex = pageIndex;
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
        newRow.children[4].textContent = adData.createAt;

        const itemControls = newRow.children[5];
        (itemControls.children[0] as HTMLButtonElement).onclick = () =>
            this.openDetailPanel(adData.adId);
        (itemControls.children[1] as HTMLButtonElement).onclick = () =>
            this.openEditPanel(adData.adId);
        (itemControls.children[2] as HTMLButtonElement).onclick = () =>
            this.openDeletePanel(adData.adId, adData.name);

        return newRow;
    }
        

    public async openDetailPanel(adId: number): Promise<void> {
        const adInfo = await Fetch.readAd(adId);
        this._detailPanelView.showPanel();
        this._detailPanelView.detailText = JSON.stringify(adInfo, null, 4);
    }

    public async openEditPanel(adId: number): Promise<void> {
        const adInfo = await Fetch.readAd(adId);
        this._editPanelView.showPanel();
        console.log(adInfo);
    }

    public async openDeletePanel(adId: number, adName: string): Promise<void> {
        const deletePanelView = this._deletePanelView;
        deletePanelView.adId = adId;
        deletePanelView.adName = adName;

        deletePanelView.update();
        deletePanelView.showPanel();
    }
}
