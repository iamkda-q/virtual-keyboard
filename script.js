/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import keysMas from "./constants/constants.js";

if (!localStorage.getItem("language")) {
    localStorage.setItem("language", "en");
}
let langG = localStorage.getItem("language");
localStorage.setItem("caps", JSON.stringify(false));
localStorage.setItem("shiftRepeat", JSON.stringify(false));

const page = document.querySelector("body");
page.classList.add("page");

const textSection = document.createElement("section");
page.append(textSection);

const textArea = document.createElement("textarea");
textArea.classList.add("text__textarea");
textSection.append(textArea);

const textMessage = document.createElement("div");

textMessage.classList.add("text__message");
textSection.append(textMessage);

const textDescription = document.createElement("p");
textDescription.classList.add("text__description");
textDescription.textContent = "Клавиатура создана в операционной системе Windows";
textMessage.append(textDescription);

const textInfo = document.createElement("p");
textInfo.classList.add("text__info");
textInfo.textContent = "Комбинация для переключения языка : любые ctrl + alt. Более подробная информация в консоли";
textMessage.append(textInfo);

const keyboard = document.createElement("section");
keyboard.classList.add("keyboard");
page.append(keyboard);

const keyboardPlate = document.createElement("div");
keyboardPlate.classList.add("keyboard__plate");
keyboard.append(keyboardPlate);

keysMas.forEach((keysMasLine, keysMasLineIndex) => {
    const keyboardLine = document.createElement("div");
    keyboardLine.classList.add(
        "keyboard__line",
        `keyboard__line_${keysMasLineIndex}`,
    );
    keyboardPlate.append(keyboardLine);
    keysMasLine.forEach(keysMasKey => {
        if (Array.isArray(keysMasKey)) {
            const keyboardDouble = document.createElement("div");
            keyboardDouble.classList.add("keyboard__double");
            keyboardLine.append(keyboardDouble);
            keysMasKey.forEach(arrow => {
                const key = arrow;
                const keyText = key.textContent;
                const keyboardButton = document.createElement("div");
                keyboardButton.classList.add("keyboard__button");
                keyboardButton.setAttribute("data-code", key.code);
                keyboardButton.textContent = [...keyText];
                keyboardDouble.append(keyboardButton);
            });
            return;
        }
        const key = keysMasKey;
        const keyText = key.textContent;
        const keyboardButton = document.createElement("button");
        keyboardButton.classList.add("keyboard__button");
        keyboardButton.setAttribute("data-code", key.code);
        /* Языкозависимые кнопки */
        if (key.lang) {
            keyboardButton.setAttribute("data-lang", true);
            /* Языкозависимые кнопки с двумя символами */
            if (keyText[langG].length !== 1) {
                keyText[langG].forEach(item => {
                    const div = document.createElement("div");
                    keyboardButton.setAttribute("data-symbol", true);
                    div.textContent = item;
                    keyboardButton.append(div);
                });
                /* Языкозависимые кнопки с одним символом (буквы) */
            } else {
                keyboardButton.setAttribute("data-letter", true);
                keyboardButton.textContent = keyText[langG][0].toUpperCase();
            }
            /* Кнопки с двумя символами */
        } else if (keyText.length !== 1) {
            keyText.forEach(item => {
                const div = document.createElement("div");
                keyboardButton.setAttribute("data-symbol", true);
                div.textContent = item;
                keyboardButton.append(div);
            });
            /* Кнопки с одним символом */
        } else {
            keyboardButton.textContent = [...keyText];
        }
        keyboardLine.append(keyboardButton);
    });
});

const buttons = Array.from(document.querySelectorAll(".keyboard__button")); // Все кнопки
const buttonsLang = buttons.filter(button => button.dataset.lang); // Языкозависимые кнопки

function changeLaguage() {
    localStorage.setItem(
        "language",
        localStorage.getItem("language") === "en" ? "ru" : "en",
    );
    langG = localStorage.getItem("language");
    buttonsLang.forEach(button => {
        const lineNumber = button.parentNode.className.match(/\d/)[0];
        const key = keysMas[lineNumber].find(
            keysMasKey => button.dataset.code === keysMasKey.code,
        );
        const keyTextLang = key.textContent[langG];
        /* Было и будет по 2 символа в кнопке */
        if (keyTextLang.length !== 1 && button.children.length) {
            Array.from(button.children).forEach((div, divIndex) => {
                div.textContent = keyTextLang[divIndex];
            });
            /* Была буква, будет 2 символа в кнопке */
        } else if (keyTextLang.length !== 1) {
            button.textContent = "";
            button.removeAttribute("data-letter");
            button.setAttribute("data-symbol", true);
            keyTextLang.forEach(item => {
                const div = document.createElement("div");
                div.textContent = item;
                button.append(div);
            });
            /* Было 2 символа в кнопке, будет буква */
        } else if (button.children.length) {
            button.removeAttribute("data-symbol");
            button.setAttribute("data-letter", true);
            Array.from(button.children).forEach(child => {
                child.remove();
            });
            button.textContent = keyTextLang[0].toUpperCase();
            /* Была буква, будет буква */
        } else {
            button.textContent = keyTextLang[0].toUpperCase();
        }
    });
}

function handleKeys(evt, currentButton) {
    const cursorPosition = textArea.selectionStart;
    const writeTextarea = text => `${textArea.value.slice(
        0,
        cursorPosition,
    )}${text}${textArea.value.slice(cursorPosition)}`;
    const translateCursor = (cursorTranslation = 1) => {
        textArea.selectionStart = cursorPosition + cursorTranslation < 0
            ? 0
            : cursorPosition + cursorTranslation;
        textArea.selectionEnd = textArea.selectionStart;
    };

    if (currentButton.hasAttribute("data-letter")) {
        if (evt.shiftKey) {
            textArea.value = JSON.parse(localStorage.getItem("caps"))
                ? writeTextarea(currentButton.textContent.toLowerCase())
                : writeTextarea(currentButton.textContent);
        } else {
            textArea.value = (JSON.parse(localStorage.getItem("caps"))
                    || JSON.parse(localStorage.getItem("shiftRepeat")))
                && !(
                    JSON.parse(localStorage.getItem("caps"))
                    && JSON.parse(localStorage.getItem("shiftRepeat"))
                )
                ? writeTextarea(currentButton.textContent)
                : writeTextarea(currentButton.textContent.toLowerCase());
        }
        translateCursor();
    } else if (currentButton.hasAttribute("data-symbol")) {
        if (evt.shiftKey) {
            textArea.value = writeTextarea(
                currentButton.childNodes[0].textContent,
            );
        } else {
            textArea.value = JSON.parse(localStorage.getItem("shiftRepeat"))
                ? writeTextarea(currentButton.childNodes[0].textContent)
                : writeTextarea(currentButton.childNodes[1].textContent);
        }
        translateCursor();
    }
    switch (currentButton.dataset.code) {
    case "Tab":
        textArea.value = writeTextarea("\t");
        translateCursor();
        break;
    case "Backspace":
        textArea.value = textArea.value.slice(0, cursorPosition - 1)
                + textArea.value.slice(cursorPosition);
        translateCursor(-1);
        break;
    case "Delete":
        textArea.value = textArea.value.slice(0, cursorPosition)
                + textArea.value.slice(cursorPosition + 1);
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
        if (JSON.parse(localStorage.getItem("caps"))) {
            localStorage.setItem("caps", JSON.stringify(false));
            currentButton.style.color = "";
        } else {
            localStorage.setItem("caps", JSON.stringify(true));
            currentButton.style.color = "red";
        }
        break;
    case "AltLeft":
    case "AltRight":
        if (evt.ctrlKey) {
            changeLaguage();
        }
        break;
    case "ControlLeft":
    case "ControlRight":
        if (evt.altKey) {
            changeLaguage();
        }
        break;
    }
}

keyboard.addEventListener("click", evt => {
    if (!evt.target.closest(".keyboard__button")) {
        return;
    }
    const currentButton = evt.target.closest(".keyboard__button");
    handleKeys(evt, currentButton);
    textArea.focus();
});

/* Логика: зажимаешь мышкой кнопку виртуальной клавиатуры,
и, не отпуская кнопку мыши, перетаскиваешь курсор на другую кнопку */
keyboard.addEventListener("mousedown", evt => {
    if (!evt.target.closest(".keyboard__button")) {
        return;
    }
    const currentButton = evt.target.closest(".keyboard__button");
    const shiftLogic = e => {
        if (e.target !== currentButton) {
            localStorage.setItem("shiftRepeat", JSON.stringify(true));
            currentButton.classList.add("keyboard__button_active");
            currentButton.style.color = "red";
        } else {
            localStorage.setItem("shiftRepeat", JSON.stringify(false));
            currentButton.classList.remove("keyboard__button_active");
            currentButton.style.color = "";
        }
        keyboard.removeEventListener("mouseup", shiftLogic);
    };
    const altLogic = e => {
        if (
            e.target.dataset.code === "ControlLeft"
                || e.target.dataset.code === "ControlRight"
        ) {
            changeLaguage();
        }
        keyboard.removeEventListener("mouseup", altLogic);
    };
    const ctrlLogic = e => {
        if (
            e.target.dataset.code === "AltLeft"
                || e.target.dataset.code === "AltRight"
        ) {
            changeLaguage();
        }
        keyboard.removeEventListener("mouseup", ctrlLogic);
    };
    switch (currentButton.dataset.code) {
    /* Зажимаешь shift, перетаскиваешь курсор на любую другую кнопку,
    кроме shift - режим введения заглавных букв и доп. символов */
    case "ShiftLeft":
    case "ShiftRight":
        keyboard.addEventListener("mouseup", shiftLogic);
        break;
    /* Зажимаешь Alt, перетаскиваешь курсор на Сtrl - переключение языка */
    case "AltLeft":
    case "AltRight":
        keyboard.addEventListener("mouseup", altLogic);
        break;
    /* Зажимаешь Сtrl, перетаскиваешь курсор на Alt - переключение языка */
    case "ControlLeft":
    case "ControlRight":
        keyboard.addEventListener("mouseup", ctrlLogic);
        break;
    }
});

document.addEventListener("keydown", evt => {
    evt.preventDefault();
    textArea.focus();
    const currentButton = buttons.find(
        button => button.dataset.code === evt.code,
    );
    currentButton.classList.add("keyboard__button_active");
    handleKeys(evt, currentButton);
    textArea.focus();
});

document.addEventListener("keyup", evt => {
    const currentButton = buttons.find(
        button => button.dataset.code === evt.code,
    );
    currentButton.classList.remove("keyboard__button_active");
    if (
        (currentButton.dataset.code === "ShiftLeft"
        || currentButton.dataset.code === "ShiftRight") && JSON.parse(localStorage.getItem("shiftRepeat"))
    ) {
        localStorage.setItem("shiftRepeat", JSON.stringify(false));
        currentButton.classList.remove("keyboard__button_active");
        currentButton.style.color = "";
    }
});

// eslint-disable-next-line no-console
console.log(
    `
    Клавиатура создана в операционной системе Windows.
    Комбинация для переключения языка : любые ctrl + alt.
    Если зажать мышкой кнопку виртуальной клавиатуры Shift, и, не отпуская кнопку мыши, перетащить курсор на любую другую кнопку, 
    а потом отпустить кнопку мыши, то кнопка Shift "зажмется" и включится режим введения заглавных букв и доп. символов.
    Для выхода из этого режима необходимо щёлкнуть по виртуальной или реальной клавише Shift.
    Если зажать мышкой кнопку виртуальной клавиатуры Alt, и, не отпуская кнопку мыши, перетащить курсор на кнопку Ctrl,
    а потом отпустить кнопку мыши, переключится язык.
    Кнопка Ctrl работает аналогично.
    `,
);
