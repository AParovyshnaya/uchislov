function gp(lastNumber, fullTest) {
    let number = 0;
    let changed;
    let userTest = ``;
    while (number < lastNumber) {
        changed = document.getElementsByClassName("normal_words")[number].textContent;
        userTest += changed;
        changed = document.getElementsByClassName("orfo")[number].value;
        userTest += changed;
        number += 1;
    }
    changed = document.getElementsByClassName("normal_words")[number].textContent;
    userTest += changed;
    let index = 0;
    let mistake = 0;
    while (index < fullTest.length) {
        let usersResult = document.getElementById("user_results");
        let correctAnswer = document.getElementById("correctAnswers");
        let correctContent = fullTest.substring(index, index + 1);
        let userContent = userTest.substring(index, index + 1);
        if (userContent > correctContent) {
            resultUser(usersResult, correctAnswer, userContent, correctContent, true);
            mistake += 1;
        } else {
            if (userContent < correctContent) {
                resultUser(usersResult, correctAnswer, userContent, correctContent, true);
                mistake += 1;
            } else {
                if (correctContent == userContent) {
                    resultUser(usersResult, correctAnswer, userContent, correctContent, false);
                }

            }
        }
        index += 1;
    }
    const target = document.getElementById("task-container");
    target.remove();
    if (mistake == 0) {
        let greeting = document.createElement("p");
        let plaseForGreeting = document.getElementById("greetingOrWishes");
        let deleteResults = document.getElementById("results");
        greeting.textContent = "Молодец!Всё верно!";
        deleteResults.remove();
        plaseForGreeting.appendChild(greeting);
    } else {
        let wishes = document.createElement("p");
        wishes.textContent = "Учи!";
        let plaseForWishes = document.getElementById("greetingOrWishes");
        plaseForWishes.appendChild(wishes);
    }


}

function resultUser(elementForBirthUserResult, elementForCorrectAnswers, userContent, correctContent, trueOrFalse) {
    let disastrousOrProperly;
    let correctAnswer;
    if (trueOrFalse) {
        disastrousOrProperly = document.createElement("label");
        disastrousOrProperly.setAttribute("class", "disastrous");
        disastrousOrProperly.textContent = userContent;
        correctAnswer = document.createElement("label");
        correctAnswer.setAttribute("class", "properly");
        correctAnswer.textContent = correctContent;


    } else {
        disastrousOrProperly = document.createElement("label");
        disastrousOrProperly.setAttribute("class", "normal");
        disastrousOrProperly.textContent = userContent;
        correctAnswer = document.createElement("label");
        correctAnswer.setAttribute("class", "normal");
        correctAnswer.textContent = correctContent;

    }
    elementForBirthUserResult.appendChild(disastrousOrProperly);
    elementForCorrectAnswers.appendChild(correctAnswer);


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

function showTask() {
    const target = document.getElementById("task-container");
    let test = "Аморальный <а>гр<о>ном в <А>встралии, <А>нтарктиде, Афр<и>ке и Азии строил а<л>юминиевые авт<о>к<о>ло<нн>ы рядом с а<лл>еями и акв<а>ториями, которые охраняли ав<и>ад<е>санты с <а>вт<о>мат<а>ми.";
    let fullTest = "Аморальный агроном в Австралии, Антарктиде, Африке и Азии строил алюминиевые автоколонны рядом с аллеями и акваториями, которые охраняли авиадесанты с автоматами.";
    let rightStaple = -1;
    let morsel = 0;
    let text;
    while (rightStaple < test.lastIndexOf('>')) {
        let leftStaple = test.indexOf(`<`, rightStaple);
        text = test.substring(rightStaple + 1, leftStaple);
        render(target, text, false);
        rightStaple = test.indexOf(`>`, leftStaple);
        text = test.substring(leftStaple + 1, rightStaple);
        render(target, text, true);
        morsel += 1;
    }
    text = test.substring(rightStaple + 1);
    render(target, text, false);
    let button = document.getElementById("button");
    button.onclick = function () {
        gp(morsel, fullTest);
        button.remove();
    };
}

document.addEventListener("DOMContentLoaded", showTask);
