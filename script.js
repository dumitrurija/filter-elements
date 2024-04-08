function getData() {
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something wrong happened");
      }
      return response.json();
    })
    .then((data) => {
      filterElementsByName(data);
      filterElementsByType(data);
      filterElementsByPrice(data);
      DOMElements(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

getData();

function DOMElements(data) {
  const container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);

  for (let i = 0; i < data.length; i++) {
    const product = document.createElement("div");
    product.classList.add("product");
    container.appendChild(product);

    const img = document.createElement("img");
    const title = document.createElement("h2");
    const type = document.createElement("p");
    const price = document.createElement("h1");

    img.src = data[i].img;
    title.textContent = data[i].name;
    type.textContent = data[i].type;
    price.textContent = `$${data[i].price}`;

    product.appendChild(img);
    product.appendChild(title);
    product.appendChild(type);
    product.appendChild(price);
  }
}

function filterElementsByName(data) {
  const filterDiv = document.createElement("div");
  filterDiv.setAttribute("id", "filter");
  document.body.appendChild(filterDiv);

  const filterInputEl = document.createElement("input");
  filterInputEl.setAttribute("type", "text");
  filterInputEl.setAttribute("placeholder", "What do you need?");
  filterDiv.appendChild(filterInputEl);

  filterInputEl.addEventListener("input", () => {
    const filterInput = filterInputEl.value.toLowerCase();

    const products = document.querySelectorAll(".product");
    for (let i = 0; i < data.length; i++) {
      const name = data[i].name.toLowerCase();
      if (name.includes(filterInput)) {
        products[i].style.display = "block";
      } else {
        products[i].style.display = "none";
      }
    }
  });
}

function filterElementsByType(data) {
  const selectEl = document.createElement("select");
  document.querySelector("#filter").appendChild(selectEl);

  let types = ["Sort by Type", "Apartment", "House", "Penthouse"];
  for (let i = 0; i < types.length; i++) {
    const optionEl = document.createElement("option");
    selectEl.appendChild(optionEl);
    optionEl.value = types[i];
    optionEl.textContent = types[i];
  }

  const products = document.getElementsByClassName("product");
  selectEl.addEventListener("change", () => {
    for (let i = 0; i < data.length; i++) {
      const selectedType = event.target.value;
      if (types[0] === selectedType || data[i].type === selectedType) {
        products[i].style.display = "block";
      } else {
        products[i].style.display = "none";
      }
    }
  });
}

function filterElementsByPrice(data) {
  const priceRangeEl = document.createElement("label")
  priceRangeEl.setAttribute("id", "priceRangeEl")
  priceRangeEl.textContent = `Price range:`
  document.querySelector("#filter").appendChild(priceRangeEl)

  const priceFilterEl = document.createElement("input")
  priceFilterEl.setAttribute("type", "range")
  priceFilterEl.setAttribute("id", "priceFilterEl")
  document.querySelector("#filter").appendChild(priceFilterEl)

  let minPrice = 0;
  for (let i = 0; i < data.length; i++) {
    minPrice = Math.min(data[i].price);
  }
  priceFilterEl.setAttribute("max", minPrice.toString());
  priceFilterEl.setAttribute("min", "0");

  let maxPrice = 0;
  for (let i = 0; i < data.length; i++) {
    maxPrice = Math.max(data[i].price);
  }
  priceFilterEl.setAttribute("max", maxPrice.toString());

  priceFilterEl.addEventListener("input", () => {
    const products = document.getElementsByClassName("product")

    priceRangeEl.textContent = `Price range: $${priceFilterEl.value}`

    data.forEach((el, index) => {
      if (priceFilterEl.value > el.price) {
        products[index].style.display = "none"
      } else {
        products[index].style.display = "block"
      }
    });
  });
}
