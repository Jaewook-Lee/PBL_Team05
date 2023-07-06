import { AdListView } from "./AdListView";
import { DeletePanelView } from "./DeletePanelVIew";
import { DetailPanelView } from "./DetailPanelView";
import { EditPanelView } from "./EditPanelView";

import css from "./index.css";
css;

const detailPanelView = new DetailPanelView();
const editPanelView = new EditPanelView();
const deletePanelView = new DeletePanelView();
const adListView = new AdListView(detailPanelView, editPanelView, deletePanelView);
adListView.initialize();

// ADDTest 눌렀을때
const adTestButton = document.getElementById("ADTest") as HTMLButtonElement;
const adTestPopup = document.getElementById("when_click_adtest") as HTMLDivElement;

adTestButton.onclick = () => {
    adTestPopup.style.display = "flex";
};
const adTestPopupCloseButton = document.getElementById("ADDTEST_ok_button") as HTMLButtonElement;

adTestPopupCloseButton.onclick = () => {
    adTestPopup.style.display = "none";
};

// ADD 눌렀을때
const addButton = document.getElementById("ADD") as HTMLButtonElement;
const addPopup = document.getElementById("when_click_ADD") as HTMLDivElement;

addButton.onclick = () => {
    addPopup.style.display = "flex";
};

const addPopupCloseButton = document.getElementById("ADD_cancel_button") as HTMLButtonElement;
addPopupCloseButton.onclick = () => {
    addPopup.style.display = "none";
};

