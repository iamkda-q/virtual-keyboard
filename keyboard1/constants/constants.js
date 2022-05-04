const enLine = "qwertyuiop[]asdfghjkl;'zxcvbnm,./".split("");
const ruLine = "йцукенгшщзхъфывапролджэячсмитьбю.".split("");
const [enKeys, ruKeys] = [{}, {}];
enLine.forEach((it,ind) => {
    enKeys[it] = it 
    ruKeys[it] = ruLine[ind];
});

const languages = {
    ru: ru,
    en: en,
};
