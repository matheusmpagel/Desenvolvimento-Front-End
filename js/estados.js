import { renderizarTarefas } from "./renderizacao.js";

export function renderizarEstado(estado, dados) {
    const status = document.querySelector("[data-estado]");
    const quadro = dados.quadro;

    if (!status || !quadro) {
        return;
    }

    const listas = quadro.querySelectorAll(".coluna ul");

    if (estado === "carregando") {
        listas.forEach((lista) => lista.replaceChildren());

        status.textContent = "Carregando tarefas...";
        return;
    }

    if (estado === "sucesso") {
        renderizarTarefas(dados.tarefas, quadro);

        status.textContent =
            `${dados.tarefas.length} tarefas carregadas.`;

        return;
    }

    if (estado === "vazio") {
        listas.forEach((lista) => lista.replaceChildren());

        status.textContent =
            "Não há tarefas cadastradas no momento.";

        return;
    }

    if (estado === "erro") {
        listas.forEach((lista) => lista.replaceChildren());

        status.textContent = dados.mensagem;
    }
}