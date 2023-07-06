export class EditPanelView {
    private _editPanel: HTMLDivElement;

    public constructor() {
        this._editPanel = document.getElementById("when_click_edit") as HTMLDivElement;

        const editPopupCloseButton = document.getElementById("list_edit_cancel_button") as HTMLButtonElement;
        editPopupCloseButton.onclick = () => this.hidePanel();
    }

    public showPanel(): void {
        this._editPanel.style.display = "flex";
    }

    public hidePanel(): void {
        this._editPanel.style.display = "none";
    }
}
