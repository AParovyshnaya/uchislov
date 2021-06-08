function filter(data) {
  generateResults(takeData());
}

function takeData() {
  const grade = document.querySelector('#grade_s_select').value;
  const letter = document.getElementById("letter").value.toLowerCase();
  let tests = data.data;
  return search(tests, grade, letter);
}
/**
 * Функция по поиску нужного теста
 * @param {*} scope - массив объектов, каждый объект имеет grade и letters
 * @param {*} grade - критерий для поиска
 * @param {*} letter - критерий для поиска
 * @returns Словарь с подходящими объектами
 */
function search(scope, grade, letter) {
  let found = [];
  if (grade == "no" && letter == "") {
    for (let test of scope) {
        found.push(test);
    }
  } else if (grade == "no") {
    for (let test of scope) {
      if (chekingLetters(test, letter)) {
        found.push(test);
      }
    }
  } else if (letter  == "") {
    for (let test of scope) {
      if (test.grade == grade) {
        found.push(test);
      }
    }
  } else {
    for (let test of scope) {
      if ((test.grade == grade) && chekingLetters(test, letter)) {
        found.push(test);
      }
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
  deleteOld(target, "specific_results");
  let parent = createParent(target, "specific_results");
  if (source.length==0) {
    noFound(parent);
  }
  else {
    for (let test of source) {
      generateOne(test, parent);
    }
  }
}

function generateOne(test, parent) {
  parent.appendChild(generateA(test));
}

function generateA(test) {
  let link = document.createElement("a");
  link.textContent = test.name;
  link.setAttribute("href", "ParseTest.html?" + test.id);
  link.setAttribute("title", "Если вы нажмёте, то перенесётесь на страницу с тестом");
  let p = document.createElement("p");
  p.appendChild(link);
  return p;
}

function randomTest(data) {
  let target = document.getElementById("random");
  deleteOld(target, "random_results");
  generateRandom(searchRandom(data.data), createParent(target, "random_results"));
}
function createParent(target, id) {
  let parent = document.createElement("div");
  parent.setAttribute("id", id);
  target.appendChild(parent);
  return parent;
}

function deleteOld(target, id) {
  let old = document.getElementById(id);
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

function noFound(parent) {
  let lable = document.createElement("label");
  lable.textContent = textContent();
  parent.appendChild(lable);
}

function textContent() {
  const grade = document.querySelector('#grade_s_select').value;
  const letter = document.getElementById("letter").value.toLowerCase();
  let content;
  if (grade=="no") {
    content = "Ничего не найдено с буквой " + "\"" + letter + "\"."
  }
  else if (letter == "") {
    content = "Ничего не найдено для " + grade + " класса."
  }
  else {
    content = "Ничего не найдено для " + grade + " класса с буквой " + "\""+ letter + "\"."
  }
  return(content)
}