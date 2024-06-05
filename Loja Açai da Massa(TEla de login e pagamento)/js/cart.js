const cart = {
  total: 0
}

function addToCart(title, price, img) {
  console.log("addToCart called");
  openCart(); // Abre o carrinho

  // Adiciona o preço do item ao total do carrinho
  cart.total += price;

  // Adiciona o item ao DOM do carrinho
  document.querySelector(".cart-lines").innerHTML += `
    <div class="cart-line" data-price='${price}'>
      <img src="https://${img}" alt="">
      <div>
        <p>${title}</p>
        <span>R$ ${price}</span>
      </div>
      <div class="close-button" onclick="removeFromCart(event)">
        <ion-icon name="close-outline"></ion-icon>
      </div>
    </div>
  `;

  // Atualiza o total do carrinho na interface
  changeTotal(cart.total);

  console.log("addToCart finished");
}

function updateURL(total) {
  console.log("updateURL called with total:", total);
  // Atualiza a URL sem redirecionar a página
  history.pushState({}, '', `?total=${total}`);
}

function redirectToPayment() {
  // Redireciona para a outra página com o valor total na URL
  window.location.href = `pagamento.html?total=${cart.total}`;
}

function removeFromCart(event) {
  console.log("removeFromCart called");
  const el = event.target.closest(".cart-line");
  const price = el.dataset.price;

  cart.total -= Number(price);
  changeTotal(cart.total);

  el.remove();
  console.log("removeFromCart finished");
}

function toggleCart() {
  console.log("toggleCart called");
  document.querySelector(".cart").classList.toggle('close');
}

function openCart() {
  console.log("openCart called");
  document.querySelector(".cart").classList.remove('close');
}

function changeTotal(total) {
  console.log("changeTotal called with total:", total);
  // Seleciona o span dentro da div com a classe "total" e atualiza seu conteúdo com o novo total
  document.querySelector(".cart .total span").innerHTML = `${new Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL" }).format(total)}`
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  // Adiciona o event listener ao botão de finalizar compra
  document.querySelector("#finalize-purchase").addEventListener("click", () => {
    updateURL(cart.total);
    redirectToPayment();
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("search-icon");
  const searchInput = document.getElementById("search-input");

  searchIcon.addEventListener("click", () => {
    // Alterna a visibilidade da barra de pesquisa
    if (searchInput.style.display === "none" || searchInput.style.display === "") {
      searchInput.style.display = "block";
      searchInput.focus(); // Coloca o foco no campo de entrada
    } else {
      searchInput.style.display = "none";
    }
  });

  // Permite pesquisa ao pressionar Enter no campo de entrada
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value;
      if (query) {
        console.log(`Searching for: ${query}`);
        // window.location.href = `search_results.html?query=${encodeURIComponent(query)}`;
      } else {
        alert("Please enter a search term.");
      }
    }
  });
});
