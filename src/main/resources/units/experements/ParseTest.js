document.addEventListener("DOMContentLoaded", showTask);
function passageTest(test, fullTest) {
    let button = document.getElementById("button");
    button.onclick = function () {
        checking(morsel, fullTest);
        button.remove();
    };
}
function parseTest(test) {
    let target = document.getElementById("task-container");
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
    return morsel;
}
function render(target, segment, isInput) {
    let text;
    if (isInput) {
        text = document.createElement("input");
        text.setAttribute("class", "orfo");
        text.setAttribute("value", segment);
        text.style.width = segment.length * 8 + 'px';
    } else {
        text = document.createElement("label");
        text.setAttribute("class", "normal_words");
        text.textContent = segment;
    }
    target.appendChild(text);
}

function generate(userContent, correctContent, trueOrFalse) {
    let usersElement = document.getElementById("user_results");
    let answersElement = document.getElementById("correctAnswers");
    let disastrous;
    let properly;
    let correctAnswer;
    if (trueOrFalse) {
        disastrous = document.createElement("label");
        disastrous.setAttribute("class", "disastrous");
        disastrous.textContent = userContent;
        correctAnswer = document.createElement("label");
        correctAnswer.setAttribute("class", "properly");
        correctAnswer.textContent = correctContent;
    } else {
        properly = document.createElement("label");
        properly.setAttribute("class", "normal");
        properly.textContent = userContent;
        correctAnswer = document.createElement("label");
        correctAnswer.setAttribute("class", "normal");
        correctAnswer.textContent = correctContent;
    }
    usersElement.appendChild(disastrous);
    answersElement.appendChild(correctAnswer);
}

function checking(lastNumber, fullTest) {
    deleteTest();
    takeData(lastNumber);
    comparison(userTest, fullTest);
    greeting(mistake);
}

function deleteTest() {
    let target = document.getElementById("task-container");
    target.remove();
}

function takeData(morsels) {
    let number = 0;
    let changed;
    let userTest = ``;
    while (number < morsels) {
        changed = document.getElementsByClassName("normal_words")[number].textContent;
        userTest += changed;
        changed = document.getElementsByClassName("orfo")[number].value;
        userTest += changed;
        number += 1;
    }
    changed = document.getElementsByClassName("normal_words")[number].textContent;
    userTest += changed;
    return userTest;
}
function comparison(userTest, fullTest) {
    let index = 0;
    let mistake = 0;
    while (index < fullTest.length) {
        let correctContent = fullTest.substring(index, index + 1);
        let userContent = userTest.substring(index, index + 1);
        if (userContent > correctContent) {
            generate(userContent, correctContent, true);
            mistake += 1;
        } else {
            if (userContent < correctContent) {
                generate(userContent, correctContent, true);
                mistake += 1;
            } else {
                if (correctContent == userContent) {
                    generate(userContent, correctContent, false);
                }

            }
        }
        index += 1;
    }
    return mistake;
}

function greeting(mistake) {
    if (mistake == 0) {
        let greeting = document.createElement("p");
        let plaseForGreeting = document.getElementById("greetingOrWishes");
        let deleteResults = document.getElementById("results");
        greeting.textContent = "Молодец!Всё верно!";
        deleteResults.remove();
        plaseForGreeting.appendChild(greeting);
    }
}
