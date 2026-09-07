import { tarefas } from "./dados.js";

function criarCartao(tarefa) {
    const cartao = document.createElement("article");

    cartao.className = "card";
    cartao.dataset.tarefaId = tarefa.id;

    const titulo = document.createElement("h4");
    titulo.textContent = tarefa.titulo;

    const botao = document.createElement("button");
    botao.type = "button";
    botao.dataset.acao = "ver-detalhes";

    const span = document.createElement("span");
    span.textContent = "Ver Detalhes";

    botao.append(span);
    cartao.append(titulo, botao);

    return cartao;
}

function renderizarTarefas(tarefas, quadro) {

    const colunas = quadro.querySelectorAll(".coluna");

    colunas.forEach((coluna) => {

        const statusColuna = coluna.dataset.status;

        const tarefasDaColuna = tarefas.filter(
            (tarefa) => tarefa.status === statusColuna
        );

        const cartoes = tarefasDaColuna.map(criarCartao);

        const lista = coluna.querySelector("ul");

        lista.replaceChildren(...cartoes);
    });
}

function instalarEventosDoQuadro(quadro) {
    quadro.addEventListener("click", (evento) => {
        if (!(evento.target instanceof Element)) return;

        const botao = evento.target.closest(
            'button[data-acao="ver-detalhes"]'
        );

        if (!botao || !quadro.contains(botao)) return;

        const cartao = botao.closest("[data-tarefa-id]");

        const tarefa = tarefas.find(
            (item) => item.id === cartao.dataset.tarefaId
        );

        if (!tarefa) return;

        console.log("Detalhes da tarefa:", tarefa);
    });
}

export {
    criarCartao,
    renderizarTarefas,
    instalarEventosDoQuadro
};