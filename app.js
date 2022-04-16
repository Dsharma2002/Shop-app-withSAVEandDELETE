const carts = document.querySelectorAll(".add-cart")
const cartSpan = document.querySelector(".cart span")

const refreshElement = document.querySelector(".refresh")
refreshElement.addEventListener("click", () => {
    localStorage.clear()
    alert("The page will reload to process your request")
    location.reload()
})

function loadCart() {
    if (cartSpan.textContent) {
        cartSpan.textContent = localStorage.getItem("cartNumbers")
    } else {
        cartSpan.textContent = 0
    }
}

let products = [
    {
        name: "Nike Hoodie Bunny",
        price: 70,
        inCart: 0,
        imgTag: "./images/nike-hoodie.jpg"
    },
    {
        name: "Nike Hoodie French",
        price: 50,
        inCart: 0,
        imgTag: "./images/7.jpg"
    },
    {
        name: "Nike Hoodie Dry-Fit",
        price: 60,
        inCart: 0,
        imgTag: "./images/nike-hoodie3.jpg"
    },
    {
        name: "Nike Hoodie Originals",
        price: 80,
        inCart: 0,
        imgTag: "./images/nike-hoodie4.jpg"
    },
    {
        name: "Nike Hoodie Plain Blue",
        price: 60,
        inCart: 0,
        imgTag: "./images/nike-hoodie5.jpg"
    },
    {
        name: "Nike Hoodie Blue and Yellow",
        price: 80,
        inCart: 0,
        imgTag: "./images/nike-hoodie6.jpg"
    },
    {
        name: "Adidas Hoodie Champion",
        price: 100,
        inCart: 0,
        imgTag: "./images/8.jpg"
    },
    {
        name: "Adidas Hoodie Scary",
        price: 70,
        inCart: 0,
        imgTag: "./images/9.jpg"
    }
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
        cartNumbers(products[i])
        totalCost(products[i])
    })
}

function cartNumbers(product) {
    // for changing the cart items number
    let existingNumbers = parseInt(localStorage.getItem("cartNumbers"))
    if (localStorage.getItem("cartNumbers")) {
        localStorage.setItem("cartNumbers", existingNumbers + 1)
    } else {
        localStorage.setItem("cartNumbers", 1)
    }
    cartSpan.textContent = localStorage.getItem("cartNumbers")

    setItems(product)
}

function setItems(product) {
    let cartItems = localStorage.getItem("itemsInCart")
    cartItems = JSON.parse(cartItems)

    if (cartItems !== null) {
        if (cartItems[product.name] === undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
        cartItems[product.name].inCart += 1
    } else {
        product.inCart = 1
        cartItems = {
            [product.name]: product
        }
    }
    localStorage.setItem("itemsInCart", JSON.stringify(cartItems))
}

function totalCost(product) {
    let existingNumbers = parseInt(localStorage.getItem("totalCost"))
    if (localStorage.getItem("totalCost")) {
        localStorage.setItem("totalCost", existingNumbers + product.price)
    } else {
        localStorage.setItem("totalCost", product.price)
    }
}



// --------------------------------------------------------------------------------------------------
function displayCart() {
    let cartItems = localStorage.getItem("itemsInCart")
    cartItems = JSON.parse(cartItems)

    const productsContainer = document.querySelector(".products")
    if (cartItems && productsContainer) {
        productsContainer.innerHTML = ""
        Object.values(cartItems).map(item => {
            // productsContainer.innerHTML += `
            // <div class="product">
            // <div class="title">
            //     <img src="${item.imgTag}">
            //     <span>${item.name}</span>
            // </div>
            // <div class="price">${item.price}</div>
            // <div class="quantity-product">
            //     <button class="remove-cart"> - </button>
            //     <span> ${item.inCart} </span>
            // </div>
            // <div class="total-product"> ${(item.price * item.inCart).toPrecision()} </div>
            // </div>  `

            const cartItemElement = document.createElement("div")
            cartItemElement.innerHTML = `
                <div class="product">
                <div class="title">
                    <img src="${item.imgTag}">
                    <span>${item.name}</span>
                </div>
                <div class="price">${item.price}</div>
                <div class="quantity-product">
                    <span> ${item.inCart} </span>
                </div>
                <div class="total-product"> ${(item.price * item.inCart).toPrecision()} </div>
                </div>`
            
            productsContainer.append(cartItemElement)
        })

        productsContainer.innerHTML += `
        <div class="total-products">
        <h2>Total cost: $${localStorage.getItem("totalCost")}</h2>
        </div>`
    }
}

loadCart()
displayCart()
// console.log(JSON.parse(localStorage.getItem("itemsInCart")))
