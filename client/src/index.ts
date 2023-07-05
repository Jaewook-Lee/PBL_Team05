import css from "./index.css";
css;

const adTestPopup = document.getElementById("when_click_adtest") as HTMLDivElement;

const adTestButton = document.getElementById("ADTest") as HTMLButtonElement;
adTestButton.onclick = () => {
    adTestPopup.style.display = "flex";
};

const adTestPopupCloseButton = document.getElementById("ok") as HTMLButtonElement;
adTestPopupCloseButton.onclick = () => {
    adTestPopup.style.display ="none";
};

