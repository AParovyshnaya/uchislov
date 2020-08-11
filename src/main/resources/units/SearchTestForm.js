function filter(data) {
  generate(search());
}

function search() {
  const grade = document.getElementById("grade").textContent;
  const letter = document.getElementById("letter").textContent;
  let tests = data.data;
  return search0(tests, grade, letter);
}

function generate(sourse) {
  const target = document.getElementById("searches_result");
  generate0(target, sourse);
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
    if ((test.grade == grade) && (test.letter == letter)) {
      found.push(test);
    }
  }
  return found;
}

/**
 * Генерирует блоки с тестами на страницу
 * @param {*} target - DOM-объект, родительский элемент для генерации
 * @param {*} source - Массив с подходящими объектами
 */
function generate0(target, source) {
  for (let test of source) {
    generateOne(target, test);
  }
}

function generateOne(target, test) {
  let block = document.createElement("p");
  block.textContent = test.name;
  target.appendChild(block);
}
