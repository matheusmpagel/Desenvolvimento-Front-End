import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";

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
        const tarefas = await carregarTarefas();

        if (tarefas.length === 0) {
            renderizarEstado("vazio", {
                quadro
            });

            return;
        }

        renderizarEstado("sucesso", {
            tarefas,
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

iniciar();