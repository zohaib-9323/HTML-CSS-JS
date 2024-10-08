let iconcart = document.querySelector(".icon-cart");
let container = document.querySelector(".container");
let body = document.querySelector("body");
let close = document.querySelector(".close");
let productlisthtml = document.querySelector(".productlist");
let listcarthtml = document.querySelector(".listcart");
let iconcartspan = document.querySelector(".icon-cart span");
let generateButton = document.querySelector(".Check");
let invoice = document.querySelector(".invoice");
let cross = document.querySelector(".cross");
const tbodyEl = document.querySelector("tbody");
let carttab = document.querySelector(".carttab");
let subtotal = document.querySelector(".subTotal");
let total = document.querySelector(".Total");
let saletax = document.querySelector(".Saletax");
let clear = document.querySelector(".clear");
let count = document.querySelector(".count");
let dvcharge = document.querySelector(".DVcharge");
let discount = document.querySelector(".Disc");
const modal = document.getElementById("confirmModal");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

let salestax = 0;
let listproducts = [];
let cart = [];

container.addEventListener("click", (event) => {
  const positionClick = event.target;

  if (
    positionClick.classList.contains("cart") ||
    positionClick.classList.contains("count")
  ) {
    if (body.classList.contains("showcart")) {
      body.classList.add("showcart");
    }
  } else if (
    positionClick.classList.contains("Addcart") ||
    positionClick.classList.contains("quantity-selector") ||
    positionClick.classList.contains("plus") ||
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("Quantity")
  ) {
    if (body.classList.contains("showcart")) {
      body.classList.add("showcart");
    }
  } else {
    body.classList.remove("showcart");
  }
});

iconcart.addEventListener("click", () => {
  if (cart.length > 0) {
    body.classList.add("showcart");
  }
});

close.addEventListener("click", () => {
  body.classList.remove("showcart");
});

const adddatatohtml = () => {
  productlisthtml.innerHTML = "";

  if (listproducts.length > 0) {
    listproducts.forEach((product) => {
      let cartItem = cart.find((item) => item.id_product === product.id);

      let quant = cartItem ? cartItem.quantity : 0;

      let newproduct = document.createElement("div");
      newproduct.classList.add("items");
      newproduct.dataset.id = product.id;

      newproduct.innerHTML = `
        <div><img src="${product.image}" alt="${product.name}"></div>
        <div class="infor">
          <h2>${product.name}</h2>
          <div class="price">Rs.${product.price}</div>
          <button class="Addcart">Add to cart</button>
          <div class="quantity-selector" style="display: ${
            quant > 0 ? "flex" : "none"
          };">
            <button class="minus">–</button>
            <span class="Quantity">${quant}</span>
            <button class="plus">+</button>
          </div>
        </div>
        
      `;

      productlisthtml.appendChild(newproduct);

      if (quant > 0) {
        let quantitySelector = newproduct.querySelector(".quantity-selector");
        let addCartButton = newproduct.querySelector(".Addcart");
        quantitySelector.style.display = "flex";
        addCartButton.style.display = "none";
        addCartButton.style.marginLeft = "42.5px";
      }
    });
  }
};
productlisthtml.addEventListener("click", (event) => {
  let positionClick = event.target;
  let productCard = positionClick.closest(".items");
  if (positionClick.classList.contains("Addcart")) {
    iconcart.style.color = "black";
    count.style.display = "inline";
    let id_product = productCard.dataset.id;
    let quantityInput = productCard.querySelector(".Quantity");
    let currentQuantity = parseInt(quantityInput.innerHTML, 10);
    quantityInput.innerHTML = currentQuantity + 1;
    addtocart(id_product, 1);
    clear.disabled = false;
    generateButton.disabled = false;
    let quantitySelector = productCard.querySelector(".quantity-selector");
    let addCartButton = productCard.querySelector(".Addcart");
    addCartButton.style.display = "none";
    quantitySelector.style.display = "flex";
  } else if (
    positionClick.classList.contains("plus") ||
    positionClick.classList.contains("minus")
  ) {
    let quantityInput = productCard.querySelector(".Quantity");
    let currentQuantity = parseInt(quantityInput.innerHTML, 10);

    if (positionClick.classList.contains("plus")) {
      quantityInput.innerHTML = currentQuantity + 1;
      let id_product = productCard.dataset.id;
      addtocart(id_product, 1);
    } else if (
      positionClick.classList.contains("minus") &&
      currentQuantity > 1
    ) {
      quantityInput.innerHTML = currentQuantity - 1;
      let id_product = productCard.dataset.id;
      addtocart(id_product, -1);
    } else if (
      positionClick.classList.contains("minus") &&
      currentQuantity === 1
    ) {
      let id_product = productCard.dataset.id;
      removecartitem(id_product);
      let quantitySelector = productCard.querySelector(".quantity-selector");
      let addCartButton = productCard.querySelector(".Addcart");
      quantityInput.innerHTML = 0;
      quantitySelector.style.display = "none";
      addCartButton.style.display = "inline-block";
      clear.disabled = true;
      generateButton.disabled = true;
    }
  }
});
const removecartitem = (product_id) => {
  product_id = parseInt(product_id, 10);
  let positionThisProductInCart = cart.findIndex(
    (value) => value.id_product === product_id
  );

  if (positionThisProductInCart >= 0) {
    cart.splice(positionThisProductInCart, 1);
  }

  addcarttomemory();
  addcarttohtml();
  updateCartCount();
};
const addtocart = (product_id, quantity) => {
  product_id = parseInt(product_id, 10);
  let positionThisProductInCart = cart.findIndex(
    (value) => value.id_product === product_id
  );
  let productInfo = listproducts.find(
    (product) => product.id == product_id
  );
  if (positionThisProductInCart < 0) {
    cart.push({                 //cart initialising
      id_product: product_id,
      quantity: quantity,
      name: productInfo.name,
      price: productInfo.price,
      image: productInfo.image,
    });
  } else {
    cart[positionThisProductInCart].quantity += quantity;
  }

  addcarttomemory();
  addcarttohtml();
  updateCartCount();
};

const addcarttomemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
const updateCartCount = () => {
  let totalItems = cart.length;
  if (totalItems == 0) {
    count.style.display = "none";
    iconcart.style.color = "grey";
  }
  iconcartspan.textContent = totalItems;
};
const addcarttohtml = () => {
  listcarthtml.innerHTML = "";
  if (cart.length > 0) {
    let totalAmount = 0;
    cart.forEach((item) => {
      let productInfo = listproducts.find(
        (product) => product.id == item.id_product
      );
      if (productInfo) {
        let itemTotal = productInfo.price * item.quantity;
        // console.log(item.quantity);
        // console.log(productInfo.id);
        totalAmount += itemTotal;
      }
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.dataset.id = item.id_product;
      let positionProduct = listproducts.findIndex(
        (value) => value.id == item.id_product
      );

      let info = listproducts[positionProduct];

      newItem.innerHTML = `
            
              <div class="image">
                <img src="${info.image}" alt="${info.name}">
              </div>
              <div class="name">
                <p>${info.name}</p>
                <p style="font-size:13px;">Rs.${info.price}</p>
              </div>
              <div class="quantity">
                <span style="background-color:#d0b8ac;" class="minus"><</span>
                <span style="color:#212529;">${item.quantity}</span>
                <span style="background-color:#d0b8ac;" class="plus">></span>
              </div>
              <div class="totalPrice"> Rs.${info.price * item.quantity}</div>
            
            
            `;

      listcarthtml.appendChild(newItem);
      subtotal.innerHTML = "Rs." + totalAmount;
      salestax = (totalAmount * 16) / 100;
      discount.innerHTML = "Rs." + ((totalAmount + salestax) * 4) / 100;
      saletax.innerHTML = "Rs." + salestax;
      dvcharge.innerHTML = "Rs.400";
      total.innerHTML =
        "Rs." +
        (totalAmount + salestax + 400 - ((totalAmount + salestax) * 4) / 100);
    });
  }
  if (cart.length == 0) {
    subtotal.innerHTML = "";
    saletax.innerHTML = "";
    dvcharge.innerHTML = "";
    total.innerHTML = "";
    discount.innerHTML = "";
  }
};
listcarthtml.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = positionClick.classList.contains("plus") ? "plus" : "minus";
    changeQuantityCart(parseInt(product_id, 10), type);
  }
});
const changeQuantityCart = (product_id, type) => {
  product_id = parseInt(product_id, 10);
  let positionItemInCart = cart.findIndex(
    (value) => value.id_product === product_id
  );
  if (positionItemInCart >= 0) {
    switch (type) {
      case "plus":
        cart[positionItemInCart].quantity += 1;
        adddatatohtml();
        break;
      case "minus":
        let changeQuantity = cart[positionItemInCart].quantity - 1;

        if (changeQuantity > 0) {
          cart[positionItemInCart].quantity = changeQuantity;
          adddatatohtml();
        } else {
          cart.splice(positionItemInCart, 1);
          clear.disabled = true;
          generateButton.disabled = true;
          adddatatohtml();
        }
        break;
    }
    addcarttohtml();
    updateCartCount();
    addcarttomemory();
  }
};
clear.addEventListener("click", function () {
  modal.style.display = "flex";
});

confirmBtn.addEventListener("click", function () {
  localStorage.clear();
  initApp();
  location.reload();
  modal.style.display = "none";
});

cancelBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

generateButton.addEventListener("click", function () {
  window.location.href = "invoice.html";
});
const initApp = () => {
  fetch("products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      listproducts = data;

      adddatatohtml();
    })
    .catch((error) => {
      console.error("Error fetching the products:", error);
    });
};

initApp();
