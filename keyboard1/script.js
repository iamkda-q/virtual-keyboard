import { keyCodes } from "./constants/constants.js";

if (!localStorage.language) {
    localStorage.language = "en";
}
let langG = localStorage.language;
localStorage.caps = JSON.stringify(false); // начало работы в нижнем регистре
localStorage.shiftRepeat = JSON.stringify(false); // начало работы в нижнем регистре

const page = document.querySelector("body");
page.classList.add("page");

const textSection = document.createElement("section");
page.append(textSection);

const textArea = document.createElement("textarea");
textArea.setAttribute("wrap", "hard");
textArea.classList.add("text__textarea");
textSection.append(textArea);

const keyboard = document.createElement("section");
keyboard.classList.add("keyboard");
page.append(keyboard);

const keyboardPlate = document.createElement("div");
keyboardPlate.classList.add("keyboard__plate");
keyboard.append(keyboardPlate);

keyCodes.forEach((item, index) => {
    const keyboardLine = document.createElement("div");
    keyboardLine.classList.add("keyboard__line", `keyboard__line_${index}`);
    keyboardPlate.append(keyboardLine);
    for (let i = 0; i < item.length; i++) {
        if (index === 5 && i === 7) {
            const keyboardDouble = document.createElement("div");
            keyboardDouble.classList.add("keyboard__double");
            keyboardLine.append(keyboardDouble);
            for (let j = 0; j < 2; j++) {
                const key = item[i];
                const keyText = key["textContent"];
                const keyboardButton = document.createElement("div");
                keyboardButton.classList.add("keyboard__button");
                keyboardButton.setAttribute("data-code", key["code"]);
                keyboardButton.textContent = keyText[0];
                keyboardDouble.append(keyboardButton);
                if (j === 0) i++;
            }
            continue;
        }
        const key = item[i];
        const keyText = key["textContent"];
        const keyboardButton = document.createElement("button");
        keyboardButton.classList.add("keyboard__button");
        keyboardButton.setAttribute("data-code", key["code"]);
        if (key.lang) {
            keyboardButton.setAttribute("data-lang", true);
            if (keyText[langG].length != 1) {
                keyText[langG].forEach((item) => {
                    const div = document.createElement("div");
                    keyboardButton.setAttribute("data-symbol", true);
                    div.textContent = item;
                    keyboardButton.append(div);
                });
            } else {
                keyboardButton.setAttribute("data-letter", true);
                keyboardButton.textContent = keyText[langG][0].toUpperCase();
            }
        } else if (keyText.length != 1) {
            keyText.forEach((item) => {
                const div = document.createElement("div");
                keyboardButton.setAttribute("data-symbol", true);
                div.textContent = item;
                keyboardButton.append(div);
            });
        } else {
            keyboardButton.textContent = keyText[0];
        }
        keyboardLine.append(keyboardButton);
    }
});

const buttons = Array.from(document.querySelectorAll(".keyboard__button"));
const buttonsLang = buttons.filter((it) => it.dataset.lang);

const esc = buttons.find((it) => it.dataset.code === "Escape");

esc.addEventListener("click", () => {
    localStorage.language = localStorage.language === "en" ? "ru" : "en";
    langG = localStorage.language;
    buttonsLang.forEach((button) => {
        const lineNumber = button.parentNode.className.match(/\d/)[0];
        const key = keyCodes[lineNumber].find(
            (it) => button.dataset.code === it.code
        );
        const keyTextLang = key["textContent"][langG];
        if (keyTextLang.length != 1 && button.children.length) {
            Array.from(button.children).forEach((it, ind) => {
                it.textContent = keyTextLang[ind];
            });
        } else if (keyTextLang.length != 1) {
            button.textContent = "";
            button.removeAttribute("data-letter");
            button.setAttribute("data-symbol", true);
            keyTextLang.forEach((item) => {
                const div = document.createElement("div");
                div.textContent = item;
                button.append(div);
            });
        } else if (button.children.length) {
            button.removeAttribute("data-symbol");
            button.setAttribute("data-letter", true);
            Array.from(button.children).forEach((child) => {
                child.remove();
            });
            button.textContent = keyTextLang[0].toUpperCase();
        } else {
            button.textContent = keyTextLang[0].toUpperCase();
        }
    });
});

document.addEventListener("keydown", (evt) => {
    buttons
        .find((button) => button.dataset.code === evt.code)
        .classList.add("keyboard__button_active");
});

document.addEventListener("keyup", (evt) => {
    buttons
        .find((button) => button.dataset.code === evt.code)
        .classList.remove("keyboard__button_active");
});

keyboard.addEventListener("click", (evt) => {
    if (!evt.target.closest(".keyboard__button")) {
        return;
    }
    const currentButton = evt.target.closest(".keyboard__button");
    let cursorPosition = textArea.selectionStart;
    const writeTextarea = (text) => {
        return (
            textArea.value.slice(0, cursorPosition) +
            text +
            textArea.value.slice(cursorPosition)
        );
    };
    const translateCursor = (cursorTranslation = 1) => {
        textArea.selectionStart = textArea.selectionEnd =
            cursorPosition + cursorTranslation < 0 ? 0 : cursorPosition + cursorTranslation;
    };

    if (currentButton.hasAttribute("data-letter")) {
        if (evt.shiftKey) {
            textArea.value = JSON.parse(localStorage.caps)
                ? writeTextarea(evt.target.textContent.toLowerCase())
                : writeTextarea(evt.target.textContent);
        } else {
            textArea.value =
                JSON.parse(localStorage.caps) ||
                JSON.parse(localStorage.shiftRepeat)
                    ? writeTextarea(evt.target.textContent)
                    : writeTextarea(evt.target.textContent.toLowerCase());
        }
        translateCursor();
    } else if (currentButton.hasAttribute("data-symbol")) {
        if (evt.shiftKey) {
            textArea.value = writeTextarea(
                currentButton.childNodes[0].textContent
            );
        } else {
            textArea.value = JSON.parse(localStorage.shiftRepeat)
                ? writeTextarea(currentButton.childNodes[0].textContent)
                : writeTextarea(currentButton.childNodes[1].textContent);
        }
        translateCursor();
    }
    switch (currentButton.dataset.code) {
        case "Tab":
            textArea.value = writeTextarea("   ");
            translateCursor(3);
            break;
        case "Backspace":
            textArea.value =
                textArea.value.slice(0, cursorPosition - 1) +
                textArea.value.slice(cursorPosition);
                translateCursor(-1);
            break;
        case "Delete":
            textArea.value =
                textArea.value.slice(0, cursorPosition) +
                textArea.value.slice(cursorPosition + 1);
                translateCursor(0);
            break;
        case "Enter":
            textArea.value = writeTextarea("\n");
            translateCursor();
            break;
        case "Space":
            textArea.value = writeTextarea(" ");
            translateCursor();
            break;
        case "ArrowLeft":
            translateCursor(-1);
            break;
        case "ArrowUp":
            translateCursor(-3);
            break;
        case "ArrowRight":
            translateCursor();
            break;
        case "ArrowDown":
            translateCursor(3);
            break;
        case "CapsLock":
            if (currentButton.style.color) {
                localStorage.caps = JSON.stringify(false);
                currentButton.style.color = "";
            } else {
                localStorage.caps = JSON.stringify(true);
                currentButton.style.color = "red";
            }
            break;
        case "AltLeft":
        case "AltRight":
            if (evt.shiftKey) {
                localStorage.language = "ru";
                buttons;
            } else {
                /*                 localStorage.caps = JSON.stringify(true);
                currentButton.style.color = "red"; */
            }
            break;
    }
    textArea.focus();
});

keyboard.addEventListener("mousedown", (evt) => {
    if (!evt.target.closest(".keyboard__button")) {
        return;
    }
    const currentButton = evt.target.closest(".keyboard__button");
    switch (currentButton.dataset.code) {
        case "ShiftLeft":
        case "ShiftRight":
            const shiftLogic = (e) => {
                if (
                    e.target.closest(".keyboard__button") &&
                    e.target != currentButton
                ) {
                    localStorage.shiftRepeat = JSON.stringify(true);
                    currentButton.classList.add("keyboard__button_active");
                    currentButton.style.color = "red";
                } else {
                    localStorage.shiftRepeat = JSON.stringify(false);
                    currentButton.classList.remove("keyboard__button_active");
                    currentButton.style.color = "";
                }
                keyboard.removeEventListener("mouseup", shiftLogic);
            };
            keyboard.addEventListener("mouseup", shiftLogic);
            break;
    }
});

/* textArea.addEventListener("input", () => {
    console.log(document.inputmode);
}); */
