import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";
import { renderizarTarefas } from "./renderizacao.js";

const estado = {
tarefas: [],
busca: "",
status: "todos",
prioridade: "todas",
ordenacao: "prazo-asc",
carregamento: "carregando",
erro: null,
};

const campoBusca = document.querySelector("#busca-titulo");
const filtroStatus = document.querySelectorAll('input[name="status"]');
const quadro = document.querySelector("[data-quadro]");
const botaoLimpar = document.querySelector("#limpar-filtros");

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

        estado.carregamento = "sucesso";

        renderizarAplicacao(estado, quadro);

        const ordenadas = estado.tarefas.toSorted((a, b) =>
            a.prazo.localeCompare(b.prazo)
        );

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

function renderizarAplicacao(estado, quadro) {
    const visiveis = selecionarTarefas(estado);
    const status = document.querySelector("[data-estado]");

    renderizarTarefas(visiveis, quadro);

    if (visiveis.length === 0) {
        status.textContent = "Nenhuma tarefa encontrada.";
    } else {
        status.textContent = `${visiveis.length} de ${estado.tarefas.length} tarefas`;
    }
}

campoBusca.addEventListener("input", (evento) => {
    estado.busca = evento.currentTarget.value;
    renderizarAplicacao(estado, quadro);
});

filtroStatus.forEach((filtro) => {
    filtro.addEventListener("change", (evento) => {
        estado.status = evento.currentTarget.value;
        renderizarAplicacao(estado, quadro);
    });
});

botaoLimpar.addEventListener("click", () => {
    estado.busca = "";
    estado.status = "todos";

    campoBusca.value = "";

    document.querySelector("#status-todos").checked = true;

    renderizarAplicacao(estado, quadro);
});

iniciar();