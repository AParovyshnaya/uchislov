function filter(data) {
  deleteRandomTest()
  generateResults(takeData());
}
function deleteRandomTest() {
  let random = document.getElementById("random_test");
  random.remove();
}

function takeData() {
  const grade = document.getElementById("grade").value;
  const letter = document.getElementById("letter").value.toLowerCase();
  let tests = data.data;
  return search(tests, grade, letter);
}

/**
 * @param {*} scope - массив объектов, каждый объект имеет grade и letters
 * @param {*} grade - критерий для поиска
 * @param {*} letter - критерий для поиска
 * @returns Массив с подходящими объектами
 */
function search(scope, grade, letter) {
  let found = [];
  for (let test of scope) {
    if ((test.grade == grade) && chekingLetters(test, letter)) {
      found.push(test);
    }
  }
  return found;
}

function chekingLetters(test, letterUser) {
  for (let letterTest of test.letters) {
    if (letterTest == letterUser) {
      return true;
    }
  }
  return false;
}
/**
 * Генерирует блоки с тестами на страницу
 * @param {*} source - Массив с подходящими объектами
 */
function generateResults(source) {
  for (let test of source) {
    generateOne(test);
  }
}

function generateOne(test) {
  let target = document.getElementById("searches_result");
  target.appendChild(generateA(test, test.name));
}

function generateA (test, textContent) {
  let link = document.createElement("a");
  link.textContent = textContent;
  link.setAttribute("href", "experements/ParseTest.html?" + test.id);
  return link;
}

function randomTest(data) {
  generateRandom(searchRandom(data.data)); 
}

function searchRandom(tests) {
  let test = Math.floor(Math.random() * tests.length);
  return tests[test];
}

function generateRandom(test) {
  let target = document.getElementById("random");
  target.appendChild(generateA(test, "Этот тест вам подойдёт?"));
}