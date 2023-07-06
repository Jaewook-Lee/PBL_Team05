import { Fetch } from "./Fetch";

export class DeletePanelView {
    public adId: number;
    public adName: string;

    private _deletePanel: HTMLDivElement;

    public onDeleted: () => void;

    public constructor() {
        this.adId = 0;
        this.adName = "";

        this._deletePanel = document.getElementById("when_click_delete") as HTMLDivElement;

        this.onDeleted = () => { /* Do nothing */ };

        const deletePopupCloseButton = document.getElementById("list_delete_cancel_button") as HTMLButtonElement;
        deletePopupCloseButton.onclick = () => this.hidePanel();

        const deletePopupOkButton = document.getElementById("list_delete_ok_button") as HTMLButtonElement;
        deletePopupOkButton.onclick = async () => {
            await Fetch.deleteAd(this.adId);
            this.onDeleted();
            this.hidePanel();
        };
    }

    public showPanel(): void {
        this._deletePanel.style.display = "flex";
    }

    public hidePanel(): void {
        this._deletePanel.style.display = "none";
    }

    public update() {
        const textContainer = this._deletePanel.children[0].children[0].children[0] as HTMLElement;
        textContainer.innerText = this.adName + "을(를) 삭제하시겠습니까?";
    }
}
