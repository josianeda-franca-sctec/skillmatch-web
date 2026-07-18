import { VagaFrontEnd } from "./motor.js";

const CHAVE_CANDIDATO = "skillmatch-candidato";

export async function carregarVagas() {
    try {
        const resposta = await fetch(
            "./assets/dados/vagas.json"
        );

        if (!resposta.ok) {
            throw new Error(
                `Erro ao carregar as vagas: ${resposta.status}`
            );
        }

        const dados = await resposta.json();

        return dados.map((vaga) => {
            return new VagaFrontEnd(
                vaga.id,
                vaga.empresa,
                vaga.cargo,
                vaga.requisitos,
                vaga.salario,
                vaga.modalidade,
                vaga.nivel
            );
        });
    } catch (erro) {
        console.error(
            "Não foi possível carregar as vagas.",
            erro
        );

        return [];
    }
}

export function salvarCandidato(candidato) {
    const candidatoConvertido = JSON.stringify(candidato);

    localStorage.setItem(
        CHAVE_CANDIDATO,
        candidatoConvertido
    );
}

export function recuperarCandidato() {
    const candidatoSalvo = localStorage.getItem(
        CHAVE_CANDIDATO
    );

    if (candidatoSalvo === null) {
        return null;
    }

    try {
        return JSON.parse(candidatoSalvo);
    } catch (erro) {
        console.error(
            "Não foi possível recuperar os dados do candidato.",
            erro
        );

        localStorage.removeItem(CHAVE_CANDIDATO);

        return null;
    }
}