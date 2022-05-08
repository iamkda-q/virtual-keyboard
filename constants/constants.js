const keysMas = [
    [
        { code: "Escape", lang: false, textContent: ["Esc"] },
        { code: "F1", lang: false, textContent: ["F1"] },
        { code: "F2", lang: false, textContent: ["F2"] },
        { code: "F3", lang: false, textContent: ["F3"] },
        { code: "F4", lang: false, textContent: ["F4"] },
        { code: "F5", lang: false, textContent: ["F5"] },
        { code: "F6", lang: false, textContent: ["F6"] },
        { code: "F7", lang: false, textContent: ["F7"] },
        { code: "F8", lang: false, textContent: ["F8"] },
        { code: "F9", lang: false, textContent: ["F9"] },
        { code: "F10", lang: false, textContent: ["F10"] },
        { code: "F11", lang: false, textContent: ["F11"] },
        { code: "F12", lang: false, textContent: ["F12"] },
        { code: "Insert", lang: false, textContent: ["Insert"] },
        { code: "Delete", lang: false, textContent: ["Delete"] },
    ],
    [
        {
            code: "Backquote",
            lang: true,
            symb: true,
            textContent: {
                ru: ["ё"],
                en: ["~", "`"],
            },
        },
        { code: "Digit1", lang: false, textContent: ["!", "1"] },
        {
            code: "Digit2",
            lang: true,
            symb: true,
            textContent: {
                ru: ["\"", "2"],
                en: ["@", "2"],
            },
        },
        {
            code: "Digit3",
            lang: true,
            symb: true,
            textContent: {
                ru: ["№", "3"],
                en: ["#", "3"],
            },
        },
        {
            code: "Digit4",
            lang: true,
            symb: true,
            textContent: {
                ru: [";", "4"],
                en: ["$", "4"],
            },
        },
        {
            code: "Digit5",
            lang: false,
            symb: true,
            textContent: ["%", "5"],
        },
        {
            code: "Digit6",
            lang: true,
            symb: true,
            textContent: {
                ru: [":", "6"],
                en: ["^", "6"],
            },
        },
        {
            code: "Digit7",
            lang: true,
            symb: true,
            textContent: {
                ru: ["?", "7"],
                en: ["&", "7"],
            },
        },
        {
            code: "Digit8",
            symb: true,
            lang: false,
            textContent: ["*", "8"],
        },
        {
            code: "Digit9",
            symb: true,
            lang: false,
            textContent: ["(", "9"],
        },
        {
            code: "Digit0",
            symb: true,
            lang: false,
            textContent: [")", "0"],
        },
        {
            code: "Minus",
            symb: true,
            lang: false,
            textContent: ["_", "-"],
        },
        {
            code: "Equal",
            symb: true,
            lang: false,
            textContent: ["+", "="],
        },
        { code: "Backspace", lang: false, textContent: ["←"] },
    ],
    [
        { code: "Tab", lang: false, textContent: ["Tab"] },
        {
            code: "KeyQ",
            lang: true,
            textContent: {
                ru: ["й"],
                en: ["q"],
            },
        },
        {
            code: "KeyW",
            lang: true,
            textContent: {
                ru: ["ц"],
                en: ["w"],
            },
        },
        {
            code: "KeyE",
            lang: true,
            textContent: {
                ru: ["у"],
                en: ["e"],
            },
        },
        {
            code: "KeyR",
            lang: true,
            textContent: {
                ru: ["к"],
                en: ["r"],
            },
        },
        {
            code: "KeyT",
            lang: true,
            textContent: {
                ru: ["е"],
                en: ["t"],
            },
        },
        {
            code: "KeyY",
            lang: true,
            textContent: {
                ru: ["н"],
                en: ["y"],
            },
        },
        {
            code: "KeyU",
            lang: true,
            textContent: {
                ru: ["г"],
                en: ["u"],
            },
        },
        {
            code: "KeyI",
            lang: true,
            textContent: {
                ru: ["ш"],
                en: ["i"],
            },
        },
        {
            code: "KeyO",
            lang: true,
            textContent: {
                ru: ["щ"],
                en: ["o"],
            },
        },
        {
            code: "KeyP",
            lang: true,
            textContent: {
                ru: ["з"],
                en: ["p"],
            },
        },
        {
            code: "BracketLeft",
            lang: true,
            symb: true,
            textContent: {
                ru: ["х"],
                en: ["{", "["],
            },
        },
        {
            code: "BracketRight",
            lang: true,
            symb: true,
            textContent: {
                ru: ["ъ"],
                en: ["}", "]"],
            },
        },
        {
            code: "Backslash",
            lang: true,
            symb: true,
            textContent: {
                ru: ["/", "\\"],
                en: ["|", "\\"],
            },
        },
    ],
    [
        { code: "CapsLock", lang: false, textContent: ["CapsLock"] },
        {
            code: "KeyA",
            lang: true,
            textContent: {
                ru: ["ф"],
                en: ["a"],
            },
        },
        {
            code: "KeyS",
            lang: true,
            textContent: {
                ru: ["ы"],
                en: ["s"],
            },
        },
        {
            code: "KeyD",
            lang: true,
            textContent: {
                ru: ["в"],
                en: ["d"],
            },
        },
        {
            code: "KeyF",
            lang: true,
            textContent: {
                ru: ["а"],
                en: ["f"],
            },
        },
        {
            code: "KeyG",
            lang: true,
            textContent: {
                ru: ["п"],
                en: ["g"],
            },
        },
        {
            code: "KeyH",
            lang: true,
            textContent: {
                ru: ["р"],
                en: ["h"],
            },
        },
        {
            code: "KeyJ",
            lang: true,
            textContent: {
                ru: ["о"],
                en: ["j"],
            },
        },
        {
            code: "KeyK",
            lang: true,
            textContent: {
                ru: ["л"],
                en: ["k"],
            },
        },
        {
            code: "KeyL",
            lang: true,
            textContent: {
                ru: ["д"],
                en: ["l"],
            },
        },
        {
            code: "Semicolon",
            lang: true,
            symb: true,
            textContent: {
                ru: ["ж"],
                en: [":", ";"],
            },
        },
        {
            code: "Quote",
            lang: true,
            symb: true,
            textContent: {
                ru: ["э"],
                en: ["\"", "'"],
            },
        },
        { code: "Enter", lang: false, textContent: ["Enter"] },
    ],
    [
        { code: "ShiftLeft", lang: false, textContent: ["Shift"] },
        {
            code: "IntlBackslash",
            lang: true,
            textContent: {
                ru: ["/", "\\"],
                en: ["|", "\\"],
            },
        },
        {
            code: "KeyZ",
            lang: true,
            textContent: {
                ru: ["я"],
                en: ["z"],
            },
        },
        {
            code: "KeyX",
            lang: true,
            textContent: {
                ru: ["ч"],
                en: ["x"],
            },
        },
        {
            code: "KeyC",
            lang: true,
            textContent: {
                ru: ["с"],
                en: ["c"],
            },
        },
        {
            code: "KeyV",
            lang: true,
            textContent: {
                ru: ["м"],
                en: ["v"],
            },
        },
        {
            code: "KeyB",
            lang: true,
            textContent: {
                ru: ["и"],
                en: ["b"],
            },
        },
        {
            code: "KeyN",
            lang: true,
            textContent: {
                ru: ["т"],
                en: ["n"],
            },
        },
        {
            code: "KeyM",
            lang: true,
            textContent: {
                ru: ["ь"],
                en: ["m"],
            },
        },
        {
            code: "Comma",
            lang: true,
            symb: true,
            textContent: {
                ru: ["б"],
                en: ["<", ","],
            },
        },
        {
            code: "Period",
            lang: true,
            symb: true,
            textContent: {
                ru: ["ю"],
                en: [">", "."],
            },
        },
        {
            code: "Slash",
            lang: true,
            symb: true,
            textContent: {
                ru: [",", "."],
                en: ["?", "/"],
            },
        },
        { code: "ShiftRight", lang: false, textContent: ["Shift"] },
    ],
    [
        { code: "ControlLeft", lang: false, textContent: ["Ctrl"] },
        { code: "MetaLeft", lang: false, textContent: ["Win"] },
        { code: "AltLeft", lang: false, textContent: ["Alt"] },
        { code: "Space", lang: false, textContent: [""] },
        { code: "AltRight", lang: false, textContent: ["Alt"] },
        { code: "ControlRight", lang: false, textContent: ["Ctrl"] },
        { code: "ArrowLeft", lang: false, textContent: ["←"] },
        [
            { code: "ArrowUp", lang: false, textContent: ["↑"] },
            { code: "ArrowDown", lang: false, textContent: ["↓"] },
        ],
        { code: "ArrowRight", lang: false, textContent: ["→"] },
    ],
];

export default keysMas;
