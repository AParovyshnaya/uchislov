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

function showTask() {
    const target = document.getElementById("task-container");
    let test = "Аморальный <…>гр<…>ном в <…>встралии, <…>нтарктиде, Афр<…>ке и Азии строил а<(лл\\л)>юминевые авт<…>к<…>ло<(н\\нн)>ы рядом с а<(л\\лл)>еями и акв<…>ториями, которые охраняли ав<…>ад<…>санты с <…>вт<…>мат<…>ми."
    let right_staple = -1;
    let morsel = 0;
    let text;
    while (right_staple < test.lastIndexOf('>')) {
        let leftStaple = test.indexOf(`<`, right_staple);
        text = test.substring(right_staple + 1, leftStaple);
        render(target, text, false);
        right_staple = test.indexOf(`>`, leftStaple);
        text = test.substring(leftStaple + 1, right_staple);
        render(target, text, true);
        morsel += 1;
    }
    text = test.substring(right_staple + 1);
    render(target, text, false);
    let button = document.getElementById("newButton");
    button.onclick = function () {
        gp(morsel);
    };
}

function render(target, segment, isInput) {
    let label;
    if (isInput) {
        // Renders an input field
        label = document.createElement("input");
        label.setAttribute("class", "orfo");
        label.setAttribute("value", segment);
        label.setAttribute("size", 5);
    } else {
        // Renders a plain text
        label = document.createElement("label");
        label.setAttribute("class", "normal_words");
        label.textContent = segment;
    }
    // Appends created rendered segment to the given target
    target.appendChild(label);
}

document.addEventListener("DOMContentLoaded", showTask);