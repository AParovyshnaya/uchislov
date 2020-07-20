document.addEventListener("DOMContentLoaded",function(e){
    let target = document.getElementById("aurora");
    let test = "Амо<…>ральный <...>гр<…>ном в <…>встралии, <…>нтарктиде, Афр<…>ке и Азии строил а<(лл\\л)>юмин<…>евые авт<…>к<…>ло<(н\\нн)>ы рядом с а<(л\\лл)>еями и акв<…>ториями, которые охраняли ав<…>ад<…>санты с <…>вт<…>мат<…>ми. "
    let kovychka = 0;
    let p;
    let newP;
    let kovychko = -1;
    while (kovychko < test.lastIndexOf('>')) {
        kovychka = test.indexOf(`<`, kovychko);
        p = test.substring(kovychko + 1, kovychka);
        newP = document.createElement("label");
        newP.textContent = p;
        target.appendChild(newP);
        newP.setAttribute("class", "normal_words");
        kovychko = test.indexOf(`>`,kovychka);
        p = test.substring(kovychka + 1, kovychko);
        newP = document.createElement("input");
        target.appendChild(newP);
        newP.setAttribute("class", "orfo");
        newP.setAttribute("value", p);
        newP.setAttribute("size", "3");
    }
    p = test.substring(kovychko+1);
    newP = document.createElement("label");
    newP.textContent = p;
    target.appendChild(newP);
    newP.setAttribute("class", "normal_words");

});

/// let newP = document.createElement("p");
//     newP.textContent = "Hi again!";
//     target.appendChild(newP);
// Ты должна таким же образом записвать кусочки в цикле
