// product-item.js
var img;
class ProductItem extends HTMLElement {

  constructor() {
    super();
    
    let shadow = this.attachShadow({mode: 'open'});
    let style = document.createElement('style');
    shadow.appendChild(style);
    
  }

  connectedCallback() {
    updateStyle(this);
  }

  static get observedAttributes() {
    return ['img', 'title', 'price', 'alt', 'id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == 'img') {
      img = document.createElement('img');
      img.src = newValue;
      
    }
    if (name == 'alt') {
      img.alt = newValue;
      this.shadowRoot.appendChild(img);
    }
    if (name == 'title') {
      let title = document.createElement('p');
      title.setAttribute('class', 'title');
      title.innerHTML = newValue;
      this.shadowRoot.appendChild(title);
    }
    if (name == 'price') {
      let price = document.createElement('p');
      price.setAttribute('class', 'price');
      price.innerHTML = '$' + newValue;
      this.shadowRoot.appendChild(price);
    }
    if (name == 'id') {

      // create button
      let button = document.createElement('button');
      button.innerHTML = 'Add to Cart';

      // if item is in cart, change button to say "Remove from Cart"
      let c = JSON.parse(localStorage.getItem('cart'));
      for (let i = 0; i < c.length; i++) {
        if (c[i] == newValue) {
          button.innerHTML = 'Remove from Cart';
        }
      }

    
     button.onclick = function(){
      if (button.innerHTML == 'Add to Cart') {
        button.innerHTML = 'Remove from Cart';
        alert('Added to Cart!');

        // add one to cart total
        let cartCnt = document.getElementById('cart-count');
        let cartNum = parseInt(cartCnt.innerHTML);
        cartNum = cartNum + 1;
        cartCnt.innerHTML = cartNum;

        // add id to 'cart' in local storage
        let theCart = JSON.parse(localStorage.getItem('cart'));
        theCart.push(newValue);
        localStorage.setItem('cart', JSON.stringify(theCart));
      }
      else if (button.innerHTML == 'Remove from Cart') {
        button.innerHTML = 'Add to Cart';
        alert('Removed from Cart');

        // remove one from cart total
        let cartCnt = document.getElementById('cart-count');
        let cartNum = parseInt(cartCnt.innerHTML);
        cartNum = cartNum - 1;
        cartCnt.innerHTML = cartNum;

        // remove id from 'cart' in local storage
        let theCart = JSON.parse(localStorage.getItem('cart'));
        let index = theCart.indexOf(parseInt(newValue));
        theCart.splice(index,1);
        localStorage.setItem('cart', JSON.stringify(theCart));
      }
      return false;
    }; 
    this.shadowRoot.appendChild(button);

    }
  }
}

customElements.define('product-item', ProductItem);

function updateStyle(elem) {
  const shadow = elem.shadowRoot;
  shadow.querySelector('style').textContent = `
  .price {
    color: green;
    font-size: 1.8em;
    font-weight: bold;
    margin: 0;
    grid-area: price;
  }
  
  .product {
    align-items: center;
    background-color: white;
    border-radius: 5px;
    display: grid;
    grid-template-areas: 
    'image'
    'title'
    'price'
    'add';
    grid-template-rows: 67% 11% 11% 11%;
    height: 450px;
    filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
    margin: 0 30px 30px 0;
    padding: 10px 20px;
    width: 200px;
  }
  
  button {
    background-color: rgb(255, 208, 0);
    border: none;
    border-radius: 5px;
    color: black;
    justify-self: center;
    max-height: 35px;
    padding: 8px 20px;
    transition: 0.1s ease all;
    grid-area: add;
  }
  
  button:hover {
    background-color: rgb(255, 166, 0);
    cursor: pointer;
    transition: 0.1s ease all;
  }
  
  img {
    align-self: center;
    justify-self: center;
    width: 100%;
    grid-area: image;
  }
  
  .title {
    font-size: 1.1em;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    grid-area: title;
  }
  
  .title:hover {
    font-size: 1.1em;
    margin: 0;
    white-space: wrap;
    overflow: auto;
    text-overflow: unset;
  }

  `;
}


