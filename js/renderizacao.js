function criarCartao(tarefa) {
    
    const cartao = document.createElement("article");
    cartao.className = "card";

    const titulo = document.createElement("h4");
    titulo.textContent = tarefa.titulo;

    const prioridade = document.createElement("p");
    prioridade.className = "prioridade";
    prioridade.textContent = `Prioridade: ${tarefa.prioridade}`;

    const prazo = document.createElement("p");
    prazo.className = "prazo";
    prazo.textContent = `Prazo: ${tarefa.prazo}`;

    cartao.append(titulo, prioridade, prazo);

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


export {
    criarCartao,
    renderizarTarefas
};