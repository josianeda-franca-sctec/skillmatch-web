import {
    carregarVagas,
    salvarCandidato,
    recuperarCandidato
} from "./dados.js";

import {
    prepararHabilidades,
    exibirMensagem,
    exibirVagas
} from "./ui.js";

async function iniciarAplicacao() {
    const formulario = document.querySelector(
        "#formulario-candidato"
    );

    const campoNome = document.querySelector("#nome");

    const campoHabilidades = document.querySelector(
        "#habilidades"
    );

    const campoNivel = document.querySelector("#nivel");
    const mensagem = document.querySelector("#mensagem");
    const listaVagas = document.querySelector("#lista-vagas");

    if (
        !formulario ||
        !campoNome ||
        !campoHabilidades ||
        !campoNivel ||
        !mensagem ||
        !listaVagas
    ) {
        console.error(
            "Não foi possível encontrar os elementos da interface."
        );

        return;
    }

    const candidatoSalvo = recuperarCandidato();

    if (candidatoSalvo !== null) {
        campoNome.value = candidatoSalvo.nome ?? "";

        campoHabilidades.value =
            candidatoSalvo.habilidades?.join(", ") ?? "";

        campoNivel.value = candidatoSalvo.nivel ?? "";
    }

    const vagas = await carregarVagas();

    if (vagas.length === 0) {
        exibirMensagem(
            mensagem,
            "Não foi possível carregar as vagas."
        );

        return;
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nome = campoNome.value.trim();

        const habilidades = prepararHabilidades(
            campoHabilidades.value
        );

        const nivel = campoNivel.value;

        if (nome === "") {
            exibirMensagem(
                mensagem,
                "Informe o nome do candidato."
            );

            campoNome.focus();

            return;
        }

        if (habilidades.length === 0) {
            exibirMensagem(
                mensagem,
                "Informe pelo menos uma habilidade."
            );

            campoHabilidades.focus();

            return;
        }

        if (nivel === "") {
            exibirMensagem(
                mensagem,
                "Selecione o nível profissional."
            );

            campoNivel.focus();

            return;
        }

        const candidato = {
            nome,
            habilidades,
            nivel
        };

        salvarCandidato(candidato);

        const resultados = vagas
            .map((vaga) => {
                const percentual =
                    vaga.calcularCompatibilidade(
                        habilidades
                    );

                const classificacao =
                    vaga.classificarCompatibilidade(
                        percentual
                    );

                return {
                    vaga,
                    percentual,
                    classificacao
                };
            })
            .sort((resultadoA, resultadoB) => {
                return (
                    resultadoB.percentual -
                    resultadoA.percentual
                );
            });

        const vagasCompativeis = resultados.filter(
            (resultado) => resultado.percentual > 0
        );

        if (vagasCompativeis.length === 0) {
            exibirMensagem(
                mensagem,
                `${nome}, nenhuma vaga compatível foi encontrada para as habilidades informadas.`
            );
        } else {
            exibirMensagem(
                mensagem,
                `${nome}, encontramos ${vagasCompativeis.length} vagas com alguma compatibilidade.`
            );
        }

        exibirVagas(listaVagas, resultados);
    });
}

iniciarAplicacao();
