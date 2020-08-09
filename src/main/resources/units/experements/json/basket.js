function basket(data){
    let elementPlase = document.getElementById("plase_for_text");
    let quantityCats = data.basket.cats;
    console.log(quantityCats);
    let quantityApples = data.basket.apples;
    console.log(quantityApples);
    elementPlase.textContent = "В корзине " + quantityApples + " яблок и " + quantityCats + " котов.";
}