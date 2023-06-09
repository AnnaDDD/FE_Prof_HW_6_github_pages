const productsContainer = document.querySelector('.products');
const addProductButton = document.querySelector('#addProductButton');
const newProductTitleInput = document.querySelector('#newProductTitle');


let products = JSON.parse(localStorage.getItem('products')) || [];


function generateProductCards() {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");

    const productName = document.createElement("p");
    productName.classList.add("p_style");
    productName.textContent = product.title;

    const quantityWrapper = document.createElement("div");

    const decrementButton = document.createElement("button");
    decrementButton.classList.add("btn_count", "decrement");
    decrementButton.textContent = "-";
    decrementButton.addEventListener("click", () =>
      decrementProductCount(product.id)
    );

    const quantityValue = document.createElement("span");
    quantityValue.textContent = product.count;

    const incrementButton = document.createElement("button");
    incrementButton.classList.add("btn_count", "increment");
    incrementButton.textContent = "+";
    incrementButton.addEventListener("click", () =>
      incrementProductCount(product.id)
    );

    quantityWrapper.append(decrementButton, quantityValue, incrementButton);
    productCard.append(productName, quantityWrapper);

    productsContainer.append(productCard);
  });
}


function updateLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function incrementProductCount(productId) {
  const product = products.find((item) => item.id === productId);
  if (product) {
    product.count++;
    updateLocalStorage();
    generateProductCards();
  }
}

function decrementProductCount(productId) {
  const product = products.find((item) => item.id === productId);
  if (product) {
    product.count--;
    if (product.count === 0) {
      products = products.filter((item) => item.id !== productId);
    }
    updateLocalStorage();
    generateProductCards();
  }
}

function addNewProduct() {
  const title = newProductTitleInput.value.trim();
  if (title !== "") {
    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      title: title,
      count: 1,
    };
    products.push(newProduct);
    updateLocalStorage();
    generateProductCards();
    newProductTitleInput.value = "";
  }
}

addProductButton.addEventListener("click", addNewProduct);

generateProductCards();

