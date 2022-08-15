const priceMultipleEl = document.querySelector('.price-multiple')
const discountEl = document.getElementById('discount')
const totalPriceEl = document.querySelector('.total-price')
const totalPayEl = document.querySelector('.total-pay')
const excessCashEl = document.querySelector('.excess-cash')
const searchProductEl = document.querySelector('.search-product')
const productsEl = document.querySelector('.products')
const searchUserEl = document.querySelector('.search-user')
const usersEl = document.querySelector('.users')
const users = document.querySelectorAll('.user')
const userPayEl = document.querySelector('.user-pay')
const userPayNameEl = document.querySelector('.user-pay_name')
const userPayPhoneEl = document.querySelector('.user-pay_phone')
const btnClose = document.querySelector('.btn-close')
const itemsEl = document.querySelector('.items')
const products = document.querySelectorAll('.product')



products.forEach(product => {
  product.addEventListener('click', () => {

    const name = product.querySelector('.info-name').innerText
    const price = product.querySelector('.info-price').innerText
    const id = product.querySelector('.info-id').innerText
    productsEl.classList.remove('show')
    searchProductEl.value = ''
    const item = document.createElement('div')
    item.classList.add('row', 'item')
    item.innerHTML = `<div class="col-md ">

    <ul class="d-flex p-1 text-dark">
      <li class="stt">1</li>
      <li class="delete">
        <button class="btn-delete"><i class="far fa-trash-alt"></i></button>
      </li>
      <li class="id">${id}</li>
      <li class="name">${name} </li>
      <li class="quantity">
          <input type='number' min="1" value="1" onchange="totalPrice()">
      </li>
      <li class="unit-price"><span>${price}</span></li>
      <li class="price">
        <span>${price}</span>
      </li>
    </ul>

    </div>`  

    itemsEl.appendChild(item)

  })
})

async function searchProduct(){
  productsEl.classList.add('show')
}


// searchProductEl.addEventListener('focus', () => productsEl.classList.add('show'))
// searchProductEl.addEventListener('blur', () => productsEl.classList.remove('show'))

// searchUserEl.addEventListener('focus', () => usersEl.classList.add('show'))
// searchUserEl.addEventListener('blur', () => usersEl.classList.remove('show'))






users.forEach(user => {
  user.addEventListener('click', (e) => {
    e.stopPropagation();
    searchUserEl.value = ''
    usersEl.classList.remove('show')

    userNode = e.currentTarget
    username = userNode.querySelector('.username').innerText
    phone = userNode.querySelector('.phone').innerText
    userPayNameEl.innerHTML = username
    userPayPhoneEl.innerHTML = phone
    userPayEl.classList.remove('hidden')
  })
})

btnClose.addEventListener('click', (e) => userPayEl.classList.add('hidden'))


let btns = document.querySelectorAll(".btn-money");
btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    totalPayEl.value = e.currentTarget.value
    displayExcessCash(calExcessCash(e.currentTarget.value))
  })
})



function calTotalPay(discount){
  const priceMultiple = priceMultipleEl.value
  console.log(priceMultiple)
  return priceMultiple - (priceMultiple * discount / 100)
}

function calExcessCash(money){
  const totalPay =  totalPayEl.value
  const totalPrice = totalPriceEl.innerText
  const excessCash = totalPay - totalPrice
  return new Intl.NumberFormat().format(excessCash)
}

function displayTotalPay(discount){
  totalPayEl.innerHTML = calTotalPay(discount)
}

function displayExcessCash(money){
  excessCashEl.innerHTML = calExcessCash(money)
}

function totalPrice(money){
  const elemenUl = event.currentTarget.parentElement.parentElement;
  const quantity = event.currentTarget.value;
  const priceEl = elemenUl.querySelector('.price span')
  const unitPriceEl = elemenUl.querySelector('.unit-price span')
  const unitPrice = parseFloat(unitPriceEl.innerText)
  priceEl.textContent = quantity * unitPrice
}

window.addEventListener('click', (e) => {
  if(usersEl.classList.contains('show'))
    usersEl.classList.remove('show')
  
  if(productsEl.classList.contains('show'))
    productsEl.classList.remove('show')
})

async function searchUser(name){

  usersEl.classList.add('show')

//   try{
//     const resp = await fetch('/api/search-user', {
//     method: 'post',
//     body: JSON.stringify({
//           'name': name
//       }),
//     headers: {
//         'Content-Type': '/application/json'
//       }
//     })
//     const data = await resp.json()
// //        console.log(data)
//     html = data.map(user => `<li class="user"><p class="username">${user.name}</p> <p class="phone">${user.phone}</p></li>`).join('')
//     usersEl.innerHTML = html

//   }
//   catch(err){
//     console.log("Lỗi" + err)
//   }

}

