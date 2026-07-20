import {
    carregarVagas,
    salvarCandidato,
    recuperarCandidato,
    limparCandidato
} from "./dados.js";

import {
    criarContadorDeAnalises
} from "./motor.js";

import {
    prepararHabilidades,
    exibirMensagem,
    exibirPerfil,
    exibirMelhorVaga,
    exibirVagas
} from "./ui.js";

const formulario =
    document.querySelector("#formulario-candidato");

const campoNome =
    document.querySelector("#nome");

const campoArea =
    document.querySelector("#area");

const campoHabilidades =
    document.querySelector("#habilidades");

const campoExperiencia =
    document.querySelector("#experiencia-meses");

const campoNivel =
    document.querySelector("#nivel");

const botaoAnalisar =
    document.querySelector("#botao-analisar");

const botaoLimpar =
    document.querySelector("#botao-limpar");

const mensagem =
    document.querySelector("#mensagem");

const resumoCandidato =
    document.querySelector("#resumo-candidato");

const melhorVaga =
    document.querySelector("#melhor-vaga");

const listaVagas =
    document.querySelector("#lista-vagas");

const erroNome =
    document.querySelector("#erro-nome");

const erroArea =
    document.querySelector("#erro-area");

const erroHabilidades =
    document.querySelector("#erro-habilidades");

const erroExperiencia =
    document.querySelector("#erro-experiencia");

const erroNivel =
    document.querySelector("#erro-nivel");

const registrarAnalise =
    criarContadorDeAnalises();

let vagas = [];

function definirErro(
    campo,
    elementoErro,
    texto
) {
    campo.setAttribute(
        "aria-invalid",
        "true"
    );

    campo.classList.add("campo-invalido");
    elementoErro.textContent = texto;
}

function limparErro(
    campo,
    elementoErro
) {
    campo.removeAttribute("aria-invalid");
    campo.classList.remove("campo-invalido");

    elementoErro.textContent = "";
}

function limparTodosOsErros() {
    limparErro(campoNome, erroNome);
    limparErro(campoArea, erroArea);

    limparErro(
        campoHabilidades,
        erroHabilidades
    );

    limparErro(
        campoExperiencia,
        erroExperiencia
    );

    limparErro(campoNivel, erroNivel);
}

function validarFormulario() {
    limparTodosOsErros();

    const nome = campoNome.value.trim();
    const area = campoArea.value;

    const habilidades =
        prepararHabilidades(
            campoHabilidades.value
        );

    const experienciaInformada =
        campoExperiencia.value.trim();

    const experienciaMeses =
        Number(experienciaInformada);

    const nivel = campoNivel.value;

    let formularioValido = true;
    let primeiroCampoInvalido = null;

    if (!nome) {
        definirErro(
            campoNome,
            erroNome,
            "Informe o nome do candidato."
        );

        primeiroCampoInvalido ??= campoNome;
        formularioValido = false;
    }

    if (!area) {
        definirErro(
            campoArea,
            erroArea,
            "Selecione a área de interesse."
        );

        primeiroCampoInvalido ??= campoArea;
        formularioValido = false;
    }

    if (habilidades.length === 0) {
        definirErro(
            campoHabilidades,
            erroHabilidades,
            "Informe pelo menos uma habilidade."
        );

        primeiroCampoInvalido ??=
            campoHabilidades;

        formularioValido = false;
    }

    if (
        experienciaInformada === "" ||
        !Number.isInteger(experienciaMeses) ||
        experienciaMeses < 0
    ) {
        definirErro(
            campoExperiencia,
            erroExperiencia,
            "Informe uma quantidade válida de meses."
        );

        primeiroCampoInvalido ??=
            campoExperiencia;

        formularioValido = false;
    }

    if (!nivel) {
        definirErro(
            campoNivel,
            erroNivel,
            "Selecione o nível profissional."
        );

        primeiroCampoInvalido ??= campoNivel;
        formularioValido = false;
    }

    if (!formularioValido) {
        exibirMensagem(
            mensagem,
            "Revise os campos indicados antes de continuar."
        );

        primeiroCampoInvalido.focus();
    }

    return formularioValido;
}

function criarCandidato() {
    return {
        nome: campoNome.value.trim(),
        area: campoArea.value,
        habilidades: prepararHabilidades(
            campoHabilidades.value
        ),
        experienciaMeses: Number(
            campoExperiencia.value
        ),
        nivel: campoNivel.value
    };
}

function restaurarCandidato() {
    const candidatoSalvo =
        recuperarCandidato();

    if (!candidatoSalvo) {
        return;
    }

    campoNome.value =
        candidatoSalvo.nome ?? "";

    campoArea.value =
        candidatoSalvo.area ?? "";

    campoHabilidades.value =
        Array.isArray(candidatoSalvo.habilidades)
            ? candidatoSalvo.habilidades.join(", ")
            : "";

    campoExperiencia.value =
        candidatoSalvo.experienciaMeses ?? "";

    campoNivel.value =
        candidatoSalvo.nivel ?? "";
}

function processarVagas(habilidades) {
    return vagas.map((vaga) => {
        const compatibilidade =
            vaga.calcularCompatibilidade(
                habilidades
            );

        return {
            vaga,
            percentual:
                compatibilidade.percentual,
            encontradas:
                compatibilidade.encontradas,
            faltantes:
                compatibilidade.faltantes,
            classificacao:
                vaga.classificarCompatibilidade(
                    compatibilidade.percentual
                )
        };
    });
}

function encontrarMelhorVaga(resultados) {
    if (resultados.length === 0) {
        return null;
    }

    return resultados.reduce(
        (melhorResultado, resultadoAtual) => {
            if (
                resultadoAtual.percentual >
                melhorResultado.percentual
            ) {
                return resultadoAtual;
            }

            return melhorResultado;
        }
    );
}

function ordenarResultados(resultados) {
    return [...resultados].sort(
        (resultadoA, resultadoB) => {
            if (
                resultadoB.percentual !==
                resultadoA.percentual
            ) {
                return (
                    resultadoB.percentual -
                    resultadoA.percentual
                );
            }

            return resultadoB.vaga.salario -
                resultadoA.vaga.salario;
        }
    );
}

function redefinirResultados() {
    resumoCandidato.innerHTML = "";
    resumoCandidato.hidden = true;

    melhorVaga.innerHTML = "";
    melhorVaga.hidden = true;

    listaVagas.innerHTML = "";

    const estadoInicial =
        document.createElement("p");

    estadoInicial.classList.add(
        "estado-inicial"
    );

    estadoInicial.textContent =
        "Preencha o formulário para visualizar as recomendações.";

    listaVagas.appendChild(estadoInicial);
}

function limparDadosDaTela() {
    limparCandidato();
    formulario.reset();
    limparTodosOsErros();
    redefinirResultados();

    exibirMensagem(
        mensagem,
        "Dados removidos com sucesso."
    );

    campoNome.focus();
}

async function inicializarAplicacao() {
    botaoAnalisar.disabled = true;
    botaoLimpar.disabled = true;

    botaoAnalisar.textContent =
        "Carregando vagas...";

    exibirMensagem(
        mensagem,
        "Carregando vagas..."
    );

    try {
        vagas = await carregarVagas();

        restaurarCandidato();

        if (vagas.length === 0) {
            exibirMensagem(
                mensagem,
                "Nenhuma vaga disponível."
            );

            listaVagas.innerHTML = "";

            const estadoVazio =
                document.createElement("p");

            estadoVazio.classList.add(
                "estado-inicial"
            );

            estadoVazio.textContent =
                "Nenhuma vaga disponível.";

            listaVagas.appendChild(estadoVazio);

            botaoAnalisar.textContent =
                "Nenhuma vaga disponível";

            return;
        }

        exibirMensagem(
            mensagem,
            "Vagas carregadas com sucesso."
        );

        botaoAnalisar.textContent =
            "Analisar compatibilidade";
    } catch (erro) {
        console.error(erro);

        exibirMensagem(
            mensagem,
            "Não foi possível carregar as vagas. Execute o projeto pelo Live Server e tente novamente."
        );

        botaoAnalisar.textContent =
            "Erro ao carregar vagas";
    } finally {
        botaoAnalisar.disabled =
            vagas.length === 0;

        botaoLimpar.disabled = false;
    }
}

formulario.addEventListener(
    "submit",
    (evento) => {
        evento.preventDefault();

        exibirMensagem(mensagem, "");

        if (!validarFormulario()) {
            return;
        }

        const candidato = criarCandidato();

        salvarCandidato(candidato);

        const resultados =
            processarVagas(
                candidato.habilidades
            );

        const melhorResultado =
            encontrarMelhorVaga(resultados);

        const resultadosOrdenados =
            ordenarResultados(resultados);

        exibirPerfil(
            resumoCandidato,
            candidato
        );

        exibirMelhorVaga(
            melhorVaga,
            melhorResultado
        );

        exibirVagas(
            listaVagas,
            resultadosOrdenados,
            melhorResultado?.vaga.id
        );

        const numeroDaAnalise =
            registrarAnalise();

        if (
            melhorResultado &&
            melhorResultado.percentual > 0
        ) {
            exibirMensagem(
                mensagem,
                `Análise concluída para ${candidato.nome}. Esta é a análise número ${numeroDaAnalise} da sessão.`
            );
        } else {
            exibirMensagem(
                mensagem,
                `Nenhuma vaga compatível foi encontrada. Esta é a análise número ${numeroDaAnalise} da sessão.`
            );
        }

        listaVagas.focus();
    }
);

botaoLimpar.addEventListener(
    "click",
    limparDadosDaTela
);

campoNome.addEventListener(
    "input",
    () => limparErro(
        campoNome,
        erroNome
    )
);

campoArea.addEventListener(
    "change",
    () => limparErro(
        campoArea,
        erroArea
    )
);

campoHabilidades.addEventListener(
    "input",
    () => limparErro(
        campoHabilidades,
        erroHabilidades
    )
);

campoExperiencia.addEventListener(
    "input",
    () => limparErro(
        campoExperiencia,
        erroExperiencia
    )
);

campoNivel.addEventListener(
    "change",
    () => limparErro(
        campoNivel,
        erroNivel
    )
);

inicializarAplicacao();