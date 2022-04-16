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
        name: "Nike-Hoodie-Bunny",
        price: 70,
        inCart: 0,
        imgTag: "./images/nike-hoodie.jpg"
    },
    {
        name: "Nike-Hoodie-French",
        price: 50,
        inCart: 0,
        imgTag: "./images/7.jpg"
    },
    {
        name: "Nike-Hoodie-Dry-Fit",
        price: 60,
        inCart: 0,
        imgTag: "./images/nike-hoodie3.jpg"
    },
    {
        name: "Nike-Hoodie-Originals",
        price: 80,
        inCart: 0,
        imgTag: "./images/nike-hoodie4.jpg"
    },
    {
        name: "Nike-Hoodie-Plain-Blue",
        price: 60,
        inCart: 0,
        imgTag: "./images/nike-hoodie5.jpg"
    },
    {
        name: "Nike-Hoodie-Blue-and-Yellow",
        price: 80,
        inCart: 0,
        imgTag: "./images/nike-hoodie6.jpg"
    },
    {
        name: "Adidas-Hoodie-Champion",
        price: 100,
        inCart: 0,
        imgTag: "./images/8.jpg"
    },
    {
        name: "Adidas-Hoodie-Scary",
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

            const newItemElement = document.createElement("div")
            newItemElement.classList.add("new-product-container")
            const newProduct = document.createElement("div")
            newProduct.classList.add("product")
            newItemElement.append(newProduct)
            const newTitle = document.createElement("div")
            newTitle.classList.add("title")
            newProduct.append(newTitle)
            const newName = document.createElement("span")
            newName.textContent = item.name
            const newImage = document.createElement("img")
            newImage.src = item.imgTag
            newTitle.append(newImage)
            newTitle.append(newName)

            const newPrice = document.createElement("div")
            newPrice.classList.add("price")
            newPrice.textContent = item.price
            newProduct.append(newPrice)

            const newQuantity = document.createElement("div")
            newQuantity.classList.add("quantity-product")
            const spanQuantity = document.createElement("span")
            spanQuantity.textContent = item.inCart
            const removeButton = document.createElement("button")
            removeButton.classList.add("remove-cart")
            removeButton.classList.add(`${item.name}`)
            removeButton.textContent = "-"
            newQuantity.append(removeButton)
            newQuantity.append(spanQuantity)
            newProduct.append(newQuantity)

            const newItemsTotal = document.createElement("div")
            newItemsTotal.classList.add("total-product")
            newItemsTotal.textContent = item.price * item.inCart
            newProduct.append(newItemsTotal)

            productsContainer.append(newItemElement)
        })

        const totalPrice = document.createElement("div")
        totalPrice.classList.add("total-products")
        const costItemsH2 = document.createElement("h2")
        costItemsH2.textContent = `Total Cost: $${localStorage.getItem("totalCost")}`
        totalPrice.append(costItemsH2)

        productsContainer.append(totalPrice)
    }
}

loadCart()
displayCart()
console.log(document.querySelectorAll(".remove-cart"))
