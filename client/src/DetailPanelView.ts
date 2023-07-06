export class DetailPanelView {
    private _detailPanel: HTMLDivElement;
    private _detailPanelTexterea: HTMLTextAreaElement;

    public constructor() {
        this._detailPanel = document.getElementById("when_click_detail") as HTMLDivElement;
        this._detailPanelTexterea = document.getElementById("click_detail_textarea") as HTMLTextAreaElement;
    }
    
    public showDetailPanel(): void {
        this._detailPanel.style.display = "flex";
    }

    public hideDetailPanel(): void {
        this._detailPanel.style.display = "none";
    }

    public set detailText(text: string) {
        this._detailPanelTexterea.value = text;
    }

    public get detailText(): string {
        return this._detailPanelTexterea.value;
    }
}
