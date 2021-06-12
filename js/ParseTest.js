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
 * @param {} test - Вариант теста с орфорграммами
 */
function parseTest(test) {
    let rightStaple = -1;
    let text;
    while (rightStaple < test.lastIndexOf('>')) {
        let leftStaple = test.indexOf(`<`, rightStaple);
        text = test.substring(rightStaple + 1, leftStaple);
        generateTest(text, false);
        rightStaple = test.indexOf(`>`, leftStaple);
        text = test.substring(leftStaple + 1, rightStaple);
        generateTest(text, true);
    }
    text = test.substring(rightStaple + 1);
    generateTest(text, false);
}
/**
 * Генерирует тест, в котором можно работать
 * @param {} target - Место генерации
 * @param {string} - Строчка, которую генерируют
 * @param {boolean} - будет инпутом или текстом
 */
function generateTest(segment, isInput) {
    let target = document.getElementById("task-container");
    let piece;
    if (isInput) {
        piece = document.createElement("input");
        piece.setAttribute("class", "test_part orpho");
        piece.setAttribute("value", segment);
        piece.setAttribute("title", "Здесь надо напечатать необходимую букву или пробел. Троеточие уберётся автоматически.");
        piece.style.width = segment.length * 20 + 'px';
    } else {
        piece = document.createElement("label");
        piece.setAttribute("class", "test_part normal_words");
        piece.textContent = br(segment, target);
    }
    target.appendChild(piece);
}

function br(text, target) {
    let index = text.indexOf("%");
    if (index!=-1) {
        let before = text.substring(0, index);
        let after = text.substring(index+1, text.length+1);
        let lableBefore = document.createElement("label");
        lableBefore.textContent = before;
        target.appendChild(lableBefore);
        let br = document.createElement("br");
        target.appendChild(br);
        return(after);
    } else {
        return text;
    }
}
/**
 * Генерирует результаты
 * @param {*} usersLetter - вариант пользователя
 * @param {*} correctLetter - правильный вариант
 * @param {*} isInvalid - правильный у пользователя в этом месте символ или нет
 */
function generateResults(usersLetter, correctLetter, isInvalid) {
    let usersTarget = document.getElementById("user_results");
    let answersTarget = document.getElementById("correctAnswers");
    let user;
    let correct;
    if (isInvalid) {
        user = document.createElement("label");
        user.setAttribute("class", "disastrous");
        user.textContent = br(usersLetter, usersTarget);
        correct = document.createElement("label");
        correct.setAttribute("class", "properly");
        correct.textContent = br(correctLetter, answersTarget);
    } else {
        user = document.createElement("label");
        user.setAttribute("class", "normal");
        user.textContent = br(usersLetter, usersTarget);;
        correct = document.createElement("label");
        correct.setAttribute("class", "normal");
        correct.textContent = br(correctLetter, answersTarget);
    }
    usersTarget.appendChild(user);
    answersTarget.appendChild(correct);
}
/**
 * Создаёт описание к результатам
 * @param {*} target - место, где появится
 * @param {string} content - что будет написано внутри
 */
function addDescription(target, content) {
    let description = document.createElement("p");
    description.textContent = content;
    description.setAttribute("class", "description");
    target.appendChild(description);
}
/**
 * Проверка теста (включая генерацию текста результатов
 * @param {string} correct - Правильный вариант написания теста
 */
function checking(correct) {
    addDescription(document.getElementById("user_results"), "Что написали вы:");
    addDescription(document.getElementById("correctAnswers"), "Как надо:");
    greeting(comparison(takeData(), correct));
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
    return(deleteThreeDots(edited));
}
/**
 * Удаляет все троеточия
 * @param {string} test  - взятая от пользователя строка
 */
function deleteThreeDots(test) {
    let good = "";
    good = test.replace(/…/g,'');
    return(good);
}
/**
 * Сравнивает символы и говорит, насколько правильный вариант теста у пользователя
 * @param {*} edited - вариант теста от пользователя
 * @param {*} full - правильный вариант
 */
function comparison(edited, full) {
    let index = 0;
    let mistake = 0;
    let test;
    if (edited.length > full.lenght) {
        test = edited
    } else {
        test = full;
    }
    while (index < test.length) {
        let HaveBr = false
        let correctLetter = full.substring(index, index + 1);
        let usersLetter = edited.substring(index, index + 1);
        if (correctLetter=="%") {
            generateResults("%", "%", false);
            correctLetter = full.substring(index + 1, index + 2);
            usersLetter = edited.substring(index + 1, index + 2);
            HaveBr = true
        }
        if (usersLetter==correctLetter) {
            generateResults(usersLetter, correctLetter, false);
        } else {
            generateResults(usersLetter, correctLetter, true);
            mistake +=1
        }
        if (HaveBr==true) {
            index += 1
            HaveBr = false
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
