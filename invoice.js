let tbodyEl = document.querySelector("tbody");
let total = document.querySelector(".Total");
let saletax = document.querySelector(".tax");
let subtotal = document.querySelector(".Sub-total");
let back = document.querySelector(".back");
let print = document.querySelector(".print");
let Discounts = document.querySelector(".Disc");
let DV = document.querySelector(".Dv-charge");
let cart = JSON.parse(localStorage.getItem("cart"));
let date = document.querySelector(".date");
let salestax=0;
let disc=0;
const currentdate = new Date().toLocaleDateString();
console.log(tbodyEl)
date.innerHTML=`${currentdate}`;
if (!cart || cart.length === 0) {
  alert("Your cart is empty!");
} else {
  let totalAmount=0;
  tbodyEl.innerHTML="";
  cart.forEach((item) => {
    let itemTotal = item.price * item.quantity;
    totalAmount += itemTotal;
    tbodyEl.innerHTML += `
    <tr>
                 <td style="text-align: left; padding-left:25px">
                     ${item.name}
                 </td>
                 <td style ="text-align: center;">
                     ${item.price}
                 </td>
                 <td style ="text-align: center;">
                     ${item.quantity}
                 </td>
                 <td style="text-align: center;">
                     Rs.${itemTotal.toFixed(2)}
                 </td>
             </tr>`;
  });
  salestax = (totalAmount * 16) / 100;
  subtotal.innerHTML = "Rs."+totalAmount;
  saletax.innerHTML = "Rs." +salestax;
  disc=(totalAmount+salestax)*0.04;
  Discounts.innerHTML="Rs." + (disc.toFixed(2));
  total.innerHTML = "Rs."+ ((totalAmount + salestax+400)-disc);
  // fetch("products.json")
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();
  //   })
  //   .then((listproducts) => {
  //     let totalAmount = 0;
  //     tbodyEl.innerHTML = "";
  //     cart.forEach((item) => {
  //       let productInfo = listproducts.find((product) => product.id == item.id_product);
  //       if (productInfo) {
  //         let itemTotal = productInfo.price * item.quantity;
  //         totalAmount += itemTotal;
  //         tbodyEl.innerHTML += `
  //           <tr>
  //               <td style="text-align: left; padding-left:25px">
  //                   ${productInfo.name}
  //               </td>
  //               <td style ="text-align: center;">
  //                   ${productInfo.price}
  //               </td>
  //               <td style ="text-align: center;">
  //                   ${item.quantity}
  //               </td>
  //               <td style="text-align: center;">
  //                   Rs.${itemTotal.toFixed(2)}
  //               </td>
  //           </tr>`;
  //       } else {
  //         console.error(`Product with ID ${item.id_product} not found.`);
  //       }
  //     });
  //       salestax = (totalAmount * 16) / 100;
  //       subtotal.innerHTML = "Rs."+totalAmount;
  //       saletax.innerHTML = "Rs." +salestax;
  //       disc=(totalAmount+salestax)*0.04;
  //       Discounts.innerHTML="Rs." + (disc.toFixed(2));
  //       total.innerHTML = "Rs."+ ((totalAmount + salestax+400)-disc);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching the products:", error);
  //   });
}
back.addEventListener("click", function () {
    window.location.href = "index.html";
  });
  print.addEventListener("click", function () {
    window.print();
  });
