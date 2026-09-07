export const tarefas = [
    { 
        id: "t1", 
        titulo: "JS do projeto",
        status: "fazer", 
        prioridade: "media", 
        prazo: "2026-08-18" 
    },
    { 
        id: "t2", 
        titulo: "Questionários da E3",
        status: "fazer", 
        prioridade: "alta", 
        prazo: "2026-09-01" 
    },
    { 
        id: "t3", 
        titulo: "Sistema de combate por turnos",
        status: "andamento", 
        prioridade: "baixa", 
        prazo: "2026-09-02" 
    },
    { 
        id: "t4", 
        titulo: "Pesquisa da LP escolhida",
        status: "andamento", 
        prioridade: "media", 
        prazo: "2026-09-03" 
    },
    { 
        id: "t5", 
        titulo: "Slides de PI",
        status: "revisao", 
        prioridade: "media", 
        prazo: "2026-09-04" 
    },
    { 
        id: "t6", 
        titulo: "Atualização das planilhas",
        status: "revisao", 
        prioridade: "baixa", 
        prazo: "2026-09-05" 
    },
    { 
        id: "t7", 
        titulo: "HTML do projeto",
        status: "concluida", 
        prioridade: "alta", 
        prazo: "2026-09-06" 
    },
    { 
        id: "t8", 
        titulo: "Criação do banco em dupla",
        status: "concluida", 
        prioridade: "alta", 
        prazo: "2026-09-07" 
    }
];

const quadro = document.querySelector("[data-quadro]");

if (!quadro) {
throw new Error("Contêiner [data-quadro] não encontrado.");
}
