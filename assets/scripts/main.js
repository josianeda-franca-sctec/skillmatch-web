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

function definirErro(campo, elementoErro, mensagem) {
    campo.setAttribute("aria-invalid", "true");
    elementoErro.textContent = mensagem;
}

function limparErro(campo, elementoErro) {
    campo.removeAttribute("aria-invalid");
    elementoErro.textContent = "";
}

async function iniciarAplicacao() {
    const formulario = document.querySelector(
        "#formulario-candidato"
    );

    const campoNome = document.querySelector("#nome");

    const campoHabilidades = document.querySelector(
        "#habilidades"
    );

    const campoNivel = document.querySelector("#nivel");

    const botaoAnalisar = document.querySelector(
        "#botao-analisar"
    );

    const erroNome = document.querySelector("#erro-nome");

    const erroHabilidades = document.querySelector(
        "#erro-habilidades"
    );

    const erroNivel = document.querySelector("#erro-nivel");

    const mensagem = document.querySelector("#mensagem");
    const listaVagas = document.querySelector("#lista-vagas");

    if (
        !formulario ||
        !campoNome ||
        !campoHabilidades ||
        !campoNivel ||
        !botaoAnalisar ||
        !erroNome ||
        !erroHabilidades ||
        !erroNivel ||
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

    botaoAnalisar.disabled = true;
    botaoAnalisar.textContent = "Carregando vagas...";

    listaVagas.setAttribute("aria-busy", "true");

    const vagas = await carregarVagas();

    listaVagas.setAttribute("aria-busy", "false");

    botaoAnalisar.disabled = false;
    botaoAnalisar.textContent = "Analisar compatibilidade";

    if (vagas.length === 0) {
        exibirMensagem(
            mensagem,
            "Não foi possível carregar as vagas. Tente atualizar a página."
        );

        botaoAnalisar.disabled = true;

        return;
    }

    campoNome.addEventListener("input", () => {
        limparErro(campoNome, erroNome);
    });

    campoHabilidades.addEventListener("input", () => {
        limparErro(
            campoHabilidades,
            erroHabilidades
        );
    });

    campoNivel.addEventListener("change", () => {
        limparErro(campoNivel, erroNivel);
    });

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        limparErro(campoNome, erroNome);

        limparErro(
            campoHabilidades,
            erroHabilidades
        );

        limparErro(campoNivel, erroNivel);

        exibirMensagem(mensagem, "");

        const nome = campoNome.value.trim();

        const habilidades = prepararHabilidades(
            campoHabilidades.value
        );

        const nivel = campoNivel.value;

        let formularioValido = true;
        let primeiroCampoInvalido = null;

        if (nome === "") {
            definirErro(
                campoNome,
                erroNome,
                "Informe o nome do candidato."
            );

            primeiroCampoInvalido = campoNome;
            formularioValido = false;
        }

        if (habilidades.length === 0) {
            definirErro(
                campoHabilidades,
                erroHabilidades,
                "Informe pelo menos uma habilidade."
            );

            if (primeiroCampoInvalido === null) {
                primeiroCampoInvalido =
                    campoHabilidades;
            }

            formularioValido = false;
        }

        if (nivel === "") {
            definirErro(
                campoNivel,
                erroNivel,
                "Selecione o nível profissional."
            );

            if (primeiroCampoInvalido === null) {
                primeiroCampoInvalido = campoNivel;
            }

            formularioValido = false;
        }

        if (!formularioValido) {
            exibirMensagem(
                mensagem,
                "Revise os campos destacados antes de continuar."
            );

            primeiroCampoInvalido.focus();

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
        } else if (vagasCompativeis.length === 1) {
            exibirMensagem(
                mensagem,
                `${nome}, encontramos 1 vaga com alguma compatibilidade.`
            );
        } else {
            exibirMensagem(
                mensagem,
                `${nome}, encontramos ${vagasCompativeis.length} vagas com alguma compatibilidade.`
            );
        }

        listaVagas.setAttribute("aria-busy", "true");

        exibirVagas(listaVagas, resultados);

        listaVagas.setAttribute("aria-busy", "false");

        document
            .querySelector("#titulo-resultados")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
    });
}

iniciarAplicacao();
