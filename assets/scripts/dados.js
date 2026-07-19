import { VagaFrontEnd } from "./motor.js";

const CHAVE_CANDIDATO = "skillmatch-candidato";

export async function carregarVagas() {
    const resposta = await fetch(
        "./assets/dados/vagas.json"
    );

    if (!resposta.ok) {
        throw new Error(
            `Erro ao carregar vagas: ${resposta.status}`
        );
    }

    const dados = await resposta.json();

    if (!Array.isArray(dados)) {
        throw new Error(
            "O catálogo de vagas possui um formato inválido."
        );
    }

    return dados.map((vaga) => {
        return new VagaFrontEnd(
            vaga.id,
            vaga.empresa,
            vaga.cargo,
            vaga.requisitos,
            vaga.salario,
            vaga.modalidade,
            vaga.nivel,
            vaga.stack
        );
    });
}

export function salvarCandidato(candidato) {
    localStorage.setItem(
        CHAVE_CANDIDATO,
        JSON.stringify(candidato)
    );
}

export function recuperarCandidato() {
    const candidatoSalvo =
        localStorage.getItem(CHAVE_CANDIDATO);

    if (candidatoSalvo === null) {
        return null;
    }

    try {
        return JSON.parse(candidatoSalvo);
    } catch (erro) {
        console.error(
            "Erro ao recuperar o candidato:",
            erro
        );

        localStorage.removeItem(CHAVE_CANDIDATO);

        return null;
    }
}

export function limparCandidato() {
    localStorage.removeItem(CHAVE_CANDIDATO);
}