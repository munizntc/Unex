window.onload = function() {
    // Animação de entrada do container
    setTimeout(() => {
        document.querySelector('.container').classList.add('show');
        document.querySelector('.title').classList.add('visible');
    }, 300);

    // Clique para buscar feriados
    document.getElementById("buscarFeriados").addEventListener("click", function() {
        const feriadosDiv = document.getElementById("feriados");
        feriadosDiv.innerHTML = "<p>Carregando...</p>"; // Mensagem de carregamento

        // Mudar a cor do botão para cinza após ser pressionado
        this.classList.add('pressed');

        // Requisição para a API de feriados
        fetch("https://brasilapi.com.br/api/feriados/v1/2024")
            .then(response => response.json())
            .then(data => {
                feriadosDiv.innerHTML = ""; // Limpar mensagem de carregamento

                if (data.length === 0) {
                    feriadosDiv.innerHTML = "<p>Nenhum feriado encontrado.</p>";
                } else {
                    data.forEach((feriado, index) => {
                        const feriadoElement = document.createElement("div");
                        feriadoElement.classList.add("feriado");
                        feriadoElement.innerHTML = `<h5>${feriado.date} - ${feriado.name}</h5>`;
                        feriadosDiv.appendChild(feriadoElement);

                        // Animação em cascata dos feriados
                        setTimeout(() => {
                            feriadoElement.classList.add("show");
                        }, index * 150); // Atraso na animação
                    });
                }
            })
            .catch(error => {
                feriadosDiv.innerHTML = `<p class="text-danger">Erro ao buscar os feriados: ${error.message}</p>`;
                console.error("Erro ao buscar os feriados:", error);
            });
    });
};