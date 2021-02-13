// Script.js

var cartNum = 0;
var cartArr = [];

function main() {
  console.log("i'm in main");
  let itemsString = window.localStorage.getItem('itemlist');
  let container = document.getElementById('product-list');
  
  let itemsObj = JSON.parse(itemsString);
  let cartCnt = document.getElementById('cart-count');
  cartNum = JSON.parse(localStorage.getItem('cart')).length;
  cartCnt.innerHTML = cartNum;


  for (let i = 0; i < itemsObj.length; i++) {


    let item = document.createElement('product-item');
    item.setAttribute('id', itemsObj[i].id);
    item.setAttribute('class', 'product');
    item.setAttribute('img', itemsObj[i].image);
    item.setAttribute('alt', itemsObj[i].title);
    item.setAttribute('title', itemsObj[i].title);
    item.setAttribute('price', itemsObj[i].price);

    container.appendChild(item);
  }

  document.body.appendChild(container);


};

window.addEventListener('DOMContentLoaded', () => {

  if (window.localStorage.getItem('itemlist') === null) {

    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(data => {
        window.localStorage.setItem('itemlist', JSON.stringify(data));
        window.localStorage.setItem('cart', JSON.stringify(cartArr));
        main();
      });


  }
  else {
    console.log("i'm in else statement");
    main();
  }
  
});









