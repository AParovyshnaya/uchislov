function passageTest(data) {
    let scope = data.data;
    let [full, orpho] = giveData(scope);
    parseTest(orpho);
    let button = document.getElementById("button");
    button.onclick = function () {
        button.remove();
        checking(full);
    };
}

function giveData(scope) {
    let id = window.location.search.substring(1);
    for (let test of scope) {
        if (test.id == id) {
            let full = test.fullVersion;
            let orpho = test.versionWihtOrthograms;
            return [full, orpho];
        }
    }
}
function parseTest(test) {
    let target = document.getElementById("task-container");
    let rightStaple = -1;
    let morsel = 0;
    let text;
    while (rightStaple < test.lastIndexOf('>')) {
        let leftStaple = test.indexOf(`<`, rightStaple);
        text = test.substring(rightStaple + 1, leftStaple);
        generateTest(target, text, false);
        rightStaple = test.indexOf(`>`, leftStaple);
        text = test.substring(leftStaple + 1, rightStaple);
        generateTest(target, text, true);
        morsel += 1;
    }
    text = test.substring(rightStaple + 1);
    generateTest(target, text, false);
    return morsel;
}
function generateTest(target, segment, isInput) {
    let piece;
    if (isInput) {
        piece = document.createElement("input");
        piece.setAttribute("class", "test_part orpho");
        piece.setAttribute("value", segment);
        piece.style.width = segment.length * 10 + 'px';
    } else {
        piece = document.createElement("label");
        piece.setAttribute("class", "test_part normal_words");
        piece.textContent = segment;
    }
    target.appendChild(piece);
}

function generateResults(userContent, correctContent, isInput) {
    let usersElement = document.getElementById("user_results");
    let answersElement = document.getElementById("correctAnswers");
    let usersLetter;
    let correct;
    if (isInput) {
        usersLetter = document.createElement("label");
        usersLetter.setAttribute("class", "disastrous");
        usersLetter.textContent = userContent;
        correct = document.createElement("label");
        correct.setAttribute("class", "properly");
        correct.textContent = correctContent;
    } else {
        usersLetter = document.createElement("label");
        usersLetter.setAttribute("class", "normal");
        usersLetter.textContent = userContent;
        correct = document.createElement("label");
        correct.setAttribute("class", "normal");
        correct.textContent = correctContent;
    }
    usersElement.appendChild(usersLetter);
    answersElement.appendChild(correct);
}

function checking(fullTest) {
    greeting(comparison(takeData(), fullTest));
    deleteTest();
}

function deleteTest() {
    let target = document.getElementById("task-container");
    target.remove();
}

function takeData() {
    let sourses = document.getElementsByClassName("test_part");
    let edited = ``;
    for (let sourse of sourses) {
        if (sourse.tagName.toLowerCase() == "label") {
            edited += sourse.textContent;
        } else {
            edited += sourse.value;
        }
    }
    return edited;
}
function comparison(edited, fullTest) {
    let index = 0;
    let mistake = 0;
    while (index < fullTest.length) {
        let correctContent = fullTest.substring(index, index + 1);
        let usersContent = edited.substring(index, index + 1);
        if (usersContent > correctContent) {
            generateResults(usersContent, correctContent, true);
            mistake += 1;
        } else {
            if (usersContent < correctContent) {
                generateResults(usersContent, correctContent, true);
                mistake += 1;
            } else {
                if (correctContent == usersContent) {
                    generateResults(usersContent, correctContent, false);
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
