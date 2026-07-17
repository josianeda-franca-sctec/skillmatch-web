import { carregarVagas } from "./dados.js";

async function iniciarAplicacao() {
    const vagas = await carregarVagas();

    console.log("Aplicação iniciada.");
    console.log("Vagas disponíveis:", vagas);
}

iniciarAplicacao();