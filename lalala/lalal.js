
        // Seleciona todos os cards de ingredientes
        const ingredientCards = document.querySelectorAll('.ingredient-card');
        // Variável para armazenar o preço total
        let totalPrice = 0;

        // Adiciona um event listener para cada card
        ingredientCards.forEach(function(card) {
            card.addEventListener('click', function(event) {
                // Verifica se o evento foi acionado diretamente no checkbox
                if (!event.target.classList.contains('ingredient-checkbox')) {
                    // Obtém o checkbox dentro do card
                    const checkbox = card.querySelector('.ingredient-checkbox');
                    // Verifica se o checkbox está marcado (selecionado)
                    if (!checkbox.checked) {
                        // Obtém o preço do ingrediente associado ao atributo 'data-price'
                        const price = parseFloat(card.getAttribute('data-price'));
                        // Marca o checkbox como selecionado
                        checkbox.checked = true;
                        // Adiciona o preço ao total
                        totalPrice += price;
                    } else {
                        // Se o checkbox já está marcado, desmarca-o
                        checkbox.checked = false;
                        // Obtém o preço do ingrediente associado ao atributo 'data-price'
                        const price = parseFloat(card.getAttribute('data-price'));
                        // Subtrai o preço do total
                        totalPrice -= price;
                    }
                    // Verifica se o preço total é menor que zero
                    if (totalPrice < 0) {
                        totalPrice = 0; // Define o preço total como zero
                    }
                    // Atualiza o preço total na interface
                    document.getElementById('total').textContent = totalPrice.toFixed(2);
                }
            });
        });
