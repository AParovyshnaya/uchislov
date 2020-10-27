/**
 * Генерирует тест, проверяет тест и генерирует результаты
 * @param {*} data - словарь с массивом тестов
 */
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

/**
 * @param {*} scope - Массив объектов, каждый объект имеет две версии
 * @returns Два варианта теста: один с орфограммами, а другой полный
 */
function giveData(scope) {
    let id = window.location.search.substring(1);
    for (let test of scope) {
        if (test.id == id) {
            let full = test.full;
            let orpho = test.test;
            return [full, orpho];
        }
    }
}
/**
 * Разбирает тест на кусочки и генерирует его
 * @param {} orpho - Вариант теста с орфорграммами
 */
function parseTest(orpho) {
    let target = document.getElementById("task-container");
    let rightStaple = -1;
    let text;
    while (rightStaple < orpho.lastIndexOf('>')) {
        let leftStaple = orpho.indexOf(`<`, rightStaple);
        text = orpho.substring(rightStaple + 1, leftStaple);
        generateTest(target, text, false);
        rightStaple = orpho.indexOf(`>`, leftStaple);
        text = orpho.substring(leftStaple + 1, rightStaple);
        generateTest(target, text, true);
    }
    text = orpho.substring(rightStaple + 1);
    generateTest(target, text, false);
}
/**
 * Генерирует тест, в котором можно работать
 * @param {} target - Место генерации
 * @param {string} - Строчка, которую генерируют
 * @param {boolean} - будет инпутом или текстом
 */
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
/**
 * Генерирует результаты
 * @param {*} user - вариант пользователя
 * @param {*} correct - правильный вариант
 * @param {*} isNormal - правильный у пользователя в этом месте символ или нет
 */
function generateResults(user, correct, isNormal) {
    let usersElement = document.getElementById("user_results");
    let answersElement = document.getElementById("correctAnswers");
    let usersLetter;
    let correct;
    if (isNormal) {
        usersLetter = document.createElement("label");
        usersLetter.setAttribute("class", "disastrous");
        usersLetter.textContent = user;
        correct = document.createElement("label");
        correct.setAttribute("class", "properly");
        correct.textContent = correct;
    } else {
        usersLetter = document.createElement("label");
        usersLetter.setAttribute("class", "normal");
        usersLetter.textContent = user;
        correct = document.createElement("label");
        correct.setAttribute("class", "normal");
        correct.textContent = correct;
    }
    usersElement.appendChild(usersLetter);
    answersElement.appendChild(correct);
}
/**
 * Проверка теста (включая генерацию текста результатов
 * @param {string} fullTest - Правильный вариант написания теста
 */
function checking(fullTest) {
    greeting(comparison(takeData(), fullTest));
    deleteTest();
}
/**
 * Удаляет тест, в котором работал пользователь
 */
function deleteTest() {
    let target = document.getElementById("task-container");
    target.remove();
}
/**
 * Берёт введёные данные от пользователя
 */
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
/**
 * Сравнивает символы и говорит, насколько правильный вариант теста у пользователя
 * @param {*} edited - вариант теста от пользователя
 * @param {*} full - правильный вариант
 */
function comparison(edited, full) {
    let index = 0;
    let mistake = 0;
    while (index < edited.length) {
        let correct = full.substring(index, index + 1);
        let users = edited.substring(index, index + 1);
        if (users > correct) {
            generateResults(users, correct, true);
            mistake += 1;
        } else {
            if (users < correct) {
                generateResults(users, correct, true);
                mistake += 1;
            } else {
                if (correct == users) {
                    generateResults(users, correct, false);
                }

            }
        }
        index += 1;
    }
    return mistake;
}
/**
 * Если ошибок нет, то говорит пользователю, что он молодец
 * @param {*} mistake количество ошибок пользователя
 */
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
