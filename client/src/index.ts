import { AdListView } from "./AdListView";
<<<<<<< HEAD
import css from "./index.css";
css;

const adListView = new AdListView();
=======
import { DeletePanelView } from "./DeletePanelVIew";
import { DetailPanelView } from "./DetailPanelView";
import { EditPanelView } from "./EditPanelView";
import css from "./index.css";
css;

const detailPanelView = new DetailPanelView();
const editPanelView = new EditPanelView();
const deletePanelView = new DeletePanelView();
const adListView = new AdListView(detailPanelView, editPanelView, deletePanelView);
>>>>>>> refs/remotes/origin/main
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
<<<<<<< HEAD
//상세 눌렀을때
const deailPanel = document.getElementById("when_click_detail") as HTMLDivElement;

const detailPopupCloseButton = document.getElementById("list_detail_cancel_button") as HTMLDivElement;
detailPopupCloseButton.onclick = () => {
    deailPanel.style.display = 'none'
}


//수정 눌렀을때
const editPanel = document.getElementById("when_click_edit") as HTMLDivElement;

const editPopupCloseButton = document.getElementById("list_edit_cancel_button") as HTMLButtonElement;
editPopupCloseButton.onclick = () => {
    editPanel.style.display = 'none';
};

//삭제 눌렀을때 
const deletePanel = document.getElementById("when_click_delete") as HTMLDivElement;

const deletePopupCloseButton = document.getElementById("list_delete_cancel_button") as HTMLButtonElement;
deletePopupCloseButton.onclick = () => {
    deletePanel.style.display = 'none';
};

//webview 눌렀을때
=======
>>>>>>> refs/remotes/origin/main
