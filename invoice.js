let tbodyEl = document.querySelector("tbody");
let total = document.querySelector(".Total");
let saletax = document.querySelector(".tax");
let subtotal = document.querySelector(".Sub-total");
let back = document.querySelector(".back");
let print = document.querySelector(".print");
let cart = JSON.parse(localStorage.getItem("cart"));
let salestax=0;
if (!cart || cart.length === 0) {
  alert("Your cart is empty!");
} else {
  fetch("products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((listproducts) => {
      let totalAmount = 0;
      tbodyEl.innerHTML = "";
      cart.forEach((item) => {
        let productInfo = listproducts.find((product) => product.id == item.id_product);
        if (productInfo) {
          let itemTotal = productInfo.price * item.quantity;
          totalAmount += itemTotal;
          tbodyEl.innerHTML += `
            <tr>
                <td style="text-align: left;">
                    ${productInfo.name}
                </td>
                <td style ="text-align: center;">
                    ${item.quantity}
                </td>
                <td style="text-align: right;">
                    Rs.${itemTotal.toFixed(2)}
                </td>
            </tr>`;
        } else {
          console.error(`Product with ID ${item.id_product} not found.`);
        }
      });
        salestax = (totalAmount * 16) / 100;
        subtotal.innerHTML = "Rs."+totalAmount;
        saletax.innerHTML = "Rs." +salestax;
        total.innerHTML = "Rs."+ (totalAmount + salestax);
    })
    .catch((error) => {
      console.error("Error fetching the products:", error);
    });
}
back.addEventListener("click", function () {
    window.location.href = "index.html";
  });
  print.addEventListener("click", function () {
    window.print();
  });
