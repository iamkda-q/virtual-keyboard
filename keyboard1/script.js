const plate = document.querySelector(".keyboard__plate");
const countButtonsInLines = [15, 14, 14, 13, 13, 9];
countButtonsInLines.forEach((item, index) => {
    const keyboardLine = document.createElement("div");
    keyboardLine.classList.add("keyboard__line", `keyboard__line_${index + 1}`);
    plate.append(keyboardLine);
    for (let i = 0; i < item; i++) {
        if (index === 5 && i === 7) {
            const keyboardDouble = document.createElement("div");
            keyboardDouble.classList.add("keyboard__double");
            keyboardLine.append(keyboardDouble);
            for (let i = 0; i < 2; i++) {
                const keyboardButton = document.createElement("div");
                keyboardButton.classList.add("keyboard__button");
                keyboardDouble.append(keyboardButton);
            }
            continue;
        }
        const keyboardButton = document.createElement("div");
        keyboardButton.classList.add("keyboard__button");
        keyboardLine.append(keyboardButton);
    }
});

