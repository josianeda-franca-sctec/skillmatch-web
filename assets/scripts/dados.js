import { VagaFrontEnd } from "./motor.js";

export async function carregarVagas() {
    try {
        const resposta = await fetch("./assets/dados/vagas.json");

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
        console.error("Não foi possível carregar as vagas.", erro);

        return [];
    }
}