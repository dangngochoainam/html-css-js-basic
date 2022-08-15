const searchEl = document.getElementById("search");
const productsEl = document.querySelector(".products");
const tbodyEl = document.querySelector(".main tbody");
const dateEl = document.querySelector("#day");
const hourEl = document.querySelector("#hour");

function searchProduct() {
  productsEl.classList.add("show");
  let item = {};
  let count = 1;

  const products = document.querySelectorAll(".product");

  products.forEach((product) => {
    product.addEventListener("click", (e) => {
      const product = e.currentTarget;
      item = {
        name: product.querySelector(".info-name").innerHTML,
        category: product.querySelector(".info-category").innerHTML,
        author: product.querySelector(".info-author").innerHTML,
        inventory: parseInt(product.querySelector(".info-inventory").innerHTML),
      };
      displayProduct(item, count++);
    });
  });
}

function displayProduct(item, count) {
  const { name, category, author, inventory } = item;
  let tr = document.createElement("tr");
  tr.innerHTML = `
            <td class="text-center"><button class="btn btn-delete" style="padding: 0; background-color: transparent;"><i class="far fa-trash-alt"></i></button></td>
            <th scope="row" class="text-center" >${count}</th>
            <td colspan="3" style="min-width: 250px;" >${name}</th>

            <td id="category" >
                <span>${category}</span>
            </td>
            <td id="author" >
                <span>${author}</span>
            </td>
            <td id="quantity" class="text-center" >
                <input type="number" min="1" value="${inventory}">
            </td>   `;

  tbodyEl.appendChild(tr);
}

window.addEventListener("DOMContentLoaded", () => {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  let newdate =
    format_two_digits(day) + "/" + format_two_digits(month) + "/" + year;

  dateEl.innerHTML = newdate;
  hourEl.innerHTML = `${format_two_digits(
    dateObj.getHours()
  )} : ${format_two_digits(dateObj.getMinutes())}`;
});

let hms = setInterval(() => {
  let dateObj = new Date();
  hourEl.innerHTML = `${format_two_digits(
    dateObj.getHours()
  )} : ${format_two_digits(dateObj.getMinutes())}`;
}, 1000);

function format_two_digits(n) {
  return n < 10 ? "0" + n : n;
}
