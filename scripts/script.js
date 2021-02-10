// Script.js
let itemlist;

window.addEventListener('DOMContentLoaded', () => {
  fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => itemlist = data);
});
