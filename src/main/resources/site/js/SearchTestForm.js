function filter(data) {
  generateResults(takeData());
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
  let target = document.getElementById("searches_result");
  deleteOld(target);
  for (let test of source) {
    generateOne(test, target);
  }
}

function generateOne(test, target) {
  target.appendChild(generateA(test));
}

function generateA(test) {
  let link = document.createElement("a");
  link.textContent = test.name;
  link.setAttribute("href", "ParseTest.html?" + test.id);
  link.setAttribute("id", "test");
  return link;
}

function randomTest(data) {
  let target = document.getElementById("random");
  deleteOld(target);
  generateRandom(searchRandom(data.data), target);
}

function deleteOld(target) {
  let old = document.getElementById("test");
  if (old != null) {
    target.removeChild(old);
  }
}

function searchRandom(tests) {
  let test = Math.floor(Math.random() * tests.length);
  return tests[test];
}

function generateRandom(test, target) {
  target.appendChild(generateA(test));
}