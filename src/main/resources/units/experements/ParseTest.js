function gp(lastNumber) {
    let newTest = ``;
    let changed;
    let number = 0;
    newTest = ``;
    while (number < lastNumber) {
        changed = document.getElementsByClassName("normal_words")[number].textContent;
        newTest += changed;
        changed = document.getElementsByClassName("orfo")[number].value;
        newTest += changed;
        number += 1;
    }
    changed = document.getElementsByClassName("normal_words")[number].textContent;
    newTest += changed;
    let fullTest = "Аморальный агроном в Австралии, Антарктиде, Африке и Азии строил алюминиевые автоколонны рядом с аллеями и акваториями, которые охраняли авиадесанты с автоматами.";
    let index = 0
    let mistake = 0;
    while (index < fullTest.length) {
        if (newTest.substring(index, index + 1) > fullTest.substring(index, index + 1)) {
            mistake += 1;
        } else {
            if (newTest.substring(index, index + 1) < fullTest.substring(index, index + 1)) {
                mistake += 1;
            }
        }
        index += 1;
    }
    console.log(mistake);
}

document.addEventListener("DOMContentLoaded", function (e) {
    let target = document.getElementById("aurora");
    let test = "Аморальный <…>гр<…>ном в <…>встралии, <…>нтарктиде, Афр<…>ке и Азии строил а<(лл\\л)>юминевые авт<…>к<…>ло<(н\\нн)>ы рядом с а<(л\\лл)>еями и акв<…>ториями, которые охраняли ав<…>ад<…>санты с <…>вт<…>мат<…>ми."
    let right_staple = -1;
    let morsel = 0;
    let text;
    let input_label;
    while (right_staple < test.lastIndexOf('>')) {
        let leftStaple = test.indexOf(`<`, right_staple);
        text = test.substring(right_staple + 1, leftStaple);
        input_label = document.createElement("label");
        input_label.textContent = text;
        target.appendChild(input_label);
        input_label.setAttribute("class", "normal_words");
        right_staple = test.indexOf(`>`, leftStaple);
        text = test.substring(leftStaple + 1, right_staple);
        input_label = document.createElement("input");
        target.appendChild(input_label);
        input_label.setAttribute("class", "orfo");
        input_label.setAttribute("value", text);
        input_label.setAttribute("size", "6");
        morsel += 1;
    }
    text = test.substring(right_staple + 1);
    input_label = document.createElement("label");
    input_label.textContent = text;
    target.appendChild(input_label);
    input_label.setAttribute("class", "normal_words");
    let button = document.getElementById("newButton");
    button.onclick = function () {
        gp(morsel);
    };
});