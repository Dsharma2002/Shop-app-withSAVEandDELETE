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
        imgTag: "./images/nike-hoodie.jpg",
        key: 1
    },
    {
        name: "Nike-Hoodie-French",
        price: 50,
        inCart: 0,
        imgTag: "./images/7.jpg",
        key: 2
    },
    {
        name: "Nike-Hoodie-Dry-Fit",
        price: 60,
        inCart: 0,
        imgTag: "./images/nike-hoodie3.jpg",
        key: 3
    },
    {
        name: "Nike-Hoodie-Originals",
        price: 80,
        inCart: 0,
        imgTag: "./images/nike-hoodie4.jpg",
        key: 4
    },
    {
        name: "Nike-Hoodie-Plain-Blue",
        price: 60,
        inCart: 0,
        imgTag: "./images/nike-hoodie5.jpg",
        key: 5
    },
    {
        name: "Nike-Hoodie-Blue-and-Yellow",
        price: 80,
        inCart: 0,
        imgTag: "./images/nike-hoodie6.jpg",
        key: 6
    },
    {
        name: "Adkeyas-Hoodie-Champion",
        price: 100,
        inCart: 0,
        imgTag: "./images/8.jpg",
        key: 7
    },
    {
        name: "Adkeyas-Hoodie-Scary",
        price: 70,
        inCart: 0,
        imgTag: "./images/9.jpg",
        key: 8
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
            newItemElement.classList.add(`${item.name}`)
            newItemElement.dataset.name = `${item.name}`
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
            spanQuantity.classList.add("span-number")
            spanQuantity.textContent = item.inCart
            const removeButton = document.createElement("button")
            removeButton.classList.add("remove-cart")
            // removeButton.classList.add(`${item.name}`)
            removeButton.dataset.name = `${item.name}`
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
        costItemsH2.textContent = `Total Cost: $`
        const spanTotal = document.createElement("span")
        spanTotal.classList.add("items-total-price")
        spanTotal.textContent = localStorage.getItem("totalCost")
        costItemsH2.append(spanTotal)
        totalPrice.append(costItemsH2)

        productsContainer.append(totalPrice)
    }
}

loadCart()
displayCart()
// console.log(document.querySelectorAll(".remove-cart"))

const removeCartButtons = document.querySelectorAll(".remove-cart")
// console.log(removeCartButtons)
for (let i = 0; i < removeCartButtons.length; i++) {
    removeCartButtons[i].addEventListener("click", (e) => {
        // console.log(products.find(product => product.name === removeCartButtons[i].dataset.name))
        // console.log(products.findIndex(product => product.name === removeCartButtons[i].dataset.name))
        const itemInArray = products.findIndex(product => product.name === removeCartButtons[i].dataset.name)

        removeNumber(products[itemInArray])
        updateTotal(products[itemInArray])
        location.reload()
    })
}

function removeNumber(product) {
    const existingCartNumber = localStorage.getItem("cartNumbers")
    localStorage.setItem("cartNumbers", parseInt(existingCartNumber) - 1)

    cartSpan.textContent = localStorage.getItem("cartNumbers")

    setRemovedItem(product)
}

function setRemovedItem(product) {
    const mainContainer = document.querySelector(".products")
    const removedProduct = document.querySelector(`.${product.name}`)
    const spanNumber = document.querySelector(".span-number")
    let cartItems = localStorage.getItem("itemsInCart")
    cartItems = JSON.parse(cartItems)
    cartItems[product.name].inCart -= 1
    spanNumber.textContent = cartItems[product.name].inCart
    console.log("this item in cart: ", cartItems[product.name].inCart)
    if (cartItems[product.name].inCart === 0) {
        delete cartItems[product.name]
        mainContainer.removeChild(removedProduct)
    }
    localStorage.setItem("itemsInCart", JSON.stringify(cartItems))

}

function updateTotal(product) {
    const existingTotal = localStorage.getItem("totalCost")
    localStorage.setItem("totalCost", parseInt(existingTotal) - product.price)

    const totalSpan = document.querySelector(".items-total-price")
    totalSpan.textContent = localStorage.getItem("totalCost")
}