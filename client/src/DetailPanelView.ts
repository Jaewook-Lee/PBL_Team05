export class DetailPanelView {
    private _detailPanel: HTMLDivElement;
    private _detailPanelTexterea: HTMLTextAreaElement;

    public constructor() {
        this._detailPanel = document.getElementById("when_click_detail") as HTMLDivElement;
        this._detailPanelTexterea = document.getElementById("click_detail_textarea") as HTMLTextAreaElement;
        
        const detailPopupCloseButton = document.getElementById("list_detail_cancel_button") as HTMLDivElement;
        detailPopupCloseButton.onclick = () => this.hidePanel();
    }
    
    public showPanel(): void {
        this._detailPanel.style.display = "flex";
    }

    public hidePanel(): void {
        this._detailPanel.style.display = "none";
    }

    public set detailText(text: string) {
        this._detailPanelTexterea.value = text;
    }

    public get detailText(): string {
        return this._detailPanelTexterea.value;
    }
}
