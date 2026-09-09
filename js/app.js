import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";

const estado = {
tarefas: [],
busca: "",
status: "andamento",
prioridade: "todas",
ordenacao: "prazo-asc",
carregamento: "carregando",
erro: null,
};

async function iniciar() {
    const quadro = document.querySelector("[data-quadro]");

    if (!quadro) {
        throw new Error(
            "Contêiner [data-quadro] não encontrado."
        );
    }

    renderizarEstado("carregando", {
        quadro
    });

    try {
        estado.tarefas = await carregarTarefas();

        if (estado.tarefas.length === 0) {
            renderizarEstado("vazio", {
                quadro
            });

            return;
        }

        renderizarEstado("sucesso", {
            tarefas: estado.tarefas,
            quadro
        });

    } catch (erro) {
        let mensagem;

        if (erro.name === "TypeError") {
            mensagem =
                "Não foi possível conectar ao servidor. Verifique sua conexão ou o servidor local.";
        } else if (erro.name === "SyntaxError") {
            mensagem =
                "Os dados recebidos estão em formato inválido.";
        } else if (erro.name === "HttpError") {
            mensagem =
                `Não foi possível carregar as tarefas. Erro HTTP ${erro.status}.`;
        } else {
            mensagem =
                "Ocorreu um erro ao carregar as tarefas.";
        }

        renderizarEstado("erro", {
            quadro,
            mensagem
        });

        console.error(erro);
    }
}

function selecionarTarefas(estado) {
    const termo = estado.busca.trim().toLowerCase();
    return estado.tarefas
        .filter((t) => t.titulo.toLowerCase().includes(termo))
        .filter((t) =>
    estado.status === "todos" || t.status === estado.status
    );
}

console.log(estado);
console.log(selecionarTarefas(estado));

iniciar();