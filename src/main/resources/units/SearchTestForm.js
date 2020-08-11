function filter(data) {
  generate(search());
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
    if ((test.grade == grade) && (test.letters == letter)) {
      found.push(test);
    }
  }
  return found;
}

/**
 * Генерирует блоки с тестами на страницу
 * @param {*} source - Массив с подходящими объектами
 */
function generate(source) {
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
