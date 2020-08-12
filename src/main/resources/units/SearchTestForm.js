function filter(data) {
  generateResults(search());
}

function search() {
  const grade = document.getElementById("grade").value;
  const letter = document.getElementById("letter").value;
  let tests = data.data;
  return search0(tests, grade, letter);
}

/**
 * @param {*} scope - массив объектов, каждый объект имеет grade и letters
 * @param {*} grade - критерий для поиска
 * @param {*} letter - критерий для поиска
 * @returns Массив с подходящими объектами
 */
function search0(scope, grade, letter) {
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
  let block = document.createElement("p");
  block.textContent = test.name;
  let target = document.getElementById("searches_result");
  target.appendChild(block);
}
