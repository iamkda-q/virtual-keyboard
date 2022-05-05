import { keyCodes } from "./constants/constants.js";

const page = document.querySelector("body");
page.classList.add("page");

const textSection = document.createElement("section");
page.append(textSection);

const textArea = document.createElement("textarea");
textArea.classList.add("text__textarea");
textSection.append(textArea);

const keyboard = document.createElement("section");
keyboard.classList.add("keyboard");
page.append(keyboard);

const keyboardPlate = document.createElement("div");
keyboardPlate.classList.add("keyboard__plate");
keyboard.append(keyboardPlate);

// const countButtonsInLines = [15, 14, 14, 13, 13, 9];
const langG = "ru";

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

// const w = document.querySelector("[data-code='KeyW']");

// w.addEventListener("click", e => {
//     const lineNumber = e.target.parentNode.classList.value.match(/\d/)[0];
//     const key = keyCodes[lineNumber].find(it => e.target.dataset.code === it.code);
//     console.log("a".toUpperCase());
//     if (key.symbol) {

//     } {

//     }
// /*         textArea.value += "W";
//         textArea.focus(); */
// });

const letters = Array.from(buttons).filter((it) =>
    it.hasAttribute("data-letter")
);

const symbols = Array.from(buttons).filter((it) =>
    it.hasAttribute("data-symbol")
);

keyboard.addEventListener("click", (evt) => {
    if (!evt.target.closest(".keyboard__button")) {
        return;
    }
    const currentButton = evt.target.closest(".keyboard__button");
    if (currentButton.hasAttribute("data-letter")) {
        if (evt.shiftKey) {
            textArea.value += evt.target.textContent;
        } else {
            textArea.value += evt.target.textContent.toLowerCase();
        }
    } else if (currentButton.hasAttribute("data-symbol")) {
        if (evt.shiftKey) {
            textArea.value += evt.target.childNodes[0].textContent;
        } else {
            textArea.value += evt.target.childNodes[1].textContent;
        }
    }

    textArea.focus();
});

// letters.forEach((letter) => letter.addEventListener("click", (e) => {
//     if (e.shiftKey) {
//         textArea.value += e.target.textContent;
//     } else {
//         textArea.value += e.target.textContent.toLowerCase();
//     }
//     textArea.focus();
// }));

// symbols.forEach((symbol) => symbol.addEventListener("click", (e) => {
//     // console.log(e.currentTarget.childNodes[0].textContent);
//     if (e.shiftKey) {
//         textArea.value += e.target.childNodes[0].textContent;
//     } else {
//         textArea.value += e.target.childNodes[1].textContent;
//     }
//     textArea.focus();
// }));
