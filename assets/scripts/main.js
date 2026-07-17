import { carregarVagas } from "./dados.js";

async function iniciarAplicacao() {
    const vagas = await carregarVagas();

    console.log("Vagas carregadas:", vagas);
    console.log(`Quantidade de vagas: ${vagas.length}`);

    const habilidadesTeste = [
        "HTML",
        "CSS",
        "JavaScript"
    ];

    vagas.forEach((vaga) => {
        const percentual = vaga.calcularCompatibilidade(
            habilidadesTeste
        );

        const classificacao = vaga.classificarCompatibilidade(
            percentual
        );

        console.log(vaga.apresentarResumo());
        console.log(`Compatibilidade: ${percentual}%`);
        console.log(`Classificação: ${classificacao}`);
    });
}

iniciarAplicacao();